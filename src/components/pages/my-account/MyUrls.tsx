import cn from 'classnames';
import Link from 'next/link';
import React, {
  ComponentPropsWithoutRef,
  FC,
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import ArrowDownIcon from '~icons/ri/arrow-down-s-fill.jsx';
import ExternalIcon from '~icons/ri/external-link-line.jsx';
import UnlinkIcon from '~icons/ri/link-unlink.jsx';
import UnlinkSiteModal from '@/components/modals/UnlinkSiteModal';
import Shimmer from '@/components/ui/Shimmer';
import TableBodyCell from '@/components/ui/TableBodyCell';
import TableHeaderCell from '@/components/ui/TableHeaderCell';
import { useModal } from '@/context/ModalContext';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import useVisibilityToggle from '@/hooks/useVisibilityToggle';
import { GetElementType } from '@/types/helpers';
import { api, RouterOutputs } from '@/utils/api';

type Url = GetElementType<RouterOutputs['shorty']['myUrls']>;

const DataTableRow: FC<Url> = ({ url, shortUrl, visits }) => {
  const dropdownMenuRef = useRef(null);
  const dropdownMenu = useVisibilityToggle(false);
  const unlinkSiteModal = useModal(modalProps => (
    <UnlinkSiteModal shortUrl={shortUrl} {...modalProps} />
  ));

  const onUnlink = useCallback(() => {
    unlinkSiteModal.show();
    dropdownMenu.hide();
  }, [dropdownMenu, unlinkSiteModal]);

  useOnClickOutside(dropdownMenuRef, dropdownMenu.hide);

  return (
    <tr className="transition hover:bg-neutral-100">
      <TableBodyCell>{shortUrl}</TableBodyCell>
      <TableBodyCell>{url}</TableBodyCell>
      <TableBodyCell>{visits}</TableBodyCell>
      <TableBodyCell>
        <div className="relative z-10" ref={dropdownMenuRef}>
          <button
            onClick={dropdownMenu.toggle}
            className={cn(
              'flex flex-row items-center justify-center gap-2 rounded border border-neutral-700 py-2 px-3 text-neutral-700 transition bg-neutral-50 hover:bg-neutral-700 hover:text-white',
              { 'rounded-b-none': dropdownMenu.isVisible },
            )}
          >
            <span>Actions</span>
            <ArrowDownIcon className="h-4 w-4" />
          </button>
          {dropdownMenu.isVisible && (
            <div className="absolute left-0 z-10 -mt-px flex w-40 flex-1 flex-col rounded rounded-tl-none border border-neutral-700 bg-neutral-100 py-1 text-neutral-100">
              <Link
                className="flex flex-1 flex-row items-center gap-2 py-2 px-3 text-neutral-700 transition hover:bg-neutral-700 hover:text-white"
                href={`/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dropdownMenu.hide}
              >
                <ExternalIcon />
                <span>Visit</span>
              </Link>
              <button
                className="flex flex-1 flex-row items-center gap-2 py-2 px-3 text-neutral-700 transition hover:bg-neutral-700 hover:text-white"
                onClick={onUnlink}
              >
                <UnlinkIcon />
                <span>Unlink</span>
              </button>
            </div>
          )}
        </div>
      </TableBodyCell>
    </tr>
  );
};

const NotFoundTableRow: FC = () => (
  <tr>
    <TableBodyCell colSpan={4}>No URLs shortened yet</TableBodyCell>
  </tr>
);

const LoadingTableRow: FC = () => (
  <tr>
    <TableBodyCell>
      <Shimmer className="h-6 w-[250px]" />
    </TableBodyCell>
    <TableBodyCell>
      <Shimmer className="h-6 w-[100px]" />
    </TableBodyCell>
    <TableBodyCell>
      <Shimmer className="h-6 w-[30px]" />
    </TableBodyCell>
    <TableBodyCell>
      <Shimmer className="h-6 w-[24px]" />
    </TableBodyCell>
  </tr>
);

const ErrorTableRow: FC = () => (
  <tr>
    <TableBodyCell colSpan={4}>
      Something went wrong and loading the URLs failed.
    </TableBodyCell>
  </tr>
);

const MyUrls: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => {
  const query = api.shorty.myUrls.useQuery();

  const tableBody = useMemo(() => {
    if (query.isLoading) {
      return (
        <>
          <LoadingTableRow />
          <LoadingTableRow />
          <LoadingTableRow />
        </>
      );
    }

    if (query.isError) {
      return <ErrorTableRow />;
    }

    if (!query.data.length) {
      return <NotFoundTableRow />;
    }

    return query.data.map(url => <DataTableRow key={url.id} {...url} />);
  }, [query]);

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <h2 className="text-2xl font-light text-neutral-900">My Shorty URLs</h2>
      <table className="table-auto">
        <thead>
          <tr className="border-b border-dotted">
            <TableHeaderCell>Code</TableHeaderCell>
            <TableHeaderCell>URL</TableHeaderCell>
            <TableHeaderCell># of visits</TableHeaderCell>
            <TableHeaderCell />
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default memo(MyUrls);
