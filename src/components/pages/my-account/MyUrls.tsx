import cn from 'classnames';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import Shimmer from '@/components/ui/Shimmer';
import TableBodyCell from '@/components/ui/TableBodyCell';
import TableHeaderCell from '@/components/ui/TableHeaderCell';
import { GetElementType } from '@/types/helpers';
import { api, RouterOutputs } from '@/utils/api';

type DataTableRowProps = GetElementType<RouterOutputs['shorty']['myUrls']>;

const DataTableRow: FC<DataTableRowProps> = ({ url, shortUrl, visits }) => (
  <tr>
    <TableBodyCell>{url}</TableBodyCell>
    <TableBodyCell>
      <Link href={`/${shortUrl}`} target="_blank">
        /{shortUrl}
      </Link>
    </TableBodyCell>
    <TableBodyCell>{visits}</TableBodyCell>
  </tr>
);

const NotFoundTableRow: FC = () => (
  <tr>
    <TableBodyCell colSpan={3}>No URLs shortened yet</TableBodyCell>
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
  </tr>
);

const ErrorTableRow: FC = () => (
  <tr>
    <TableBodyCell colSpan={3}>
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
            <TableHeaderCell>URL</TableHeaderCell>
            <TableHeaderCell>Code</TableHeaderCell>
            <TableHeaderCell># of visits</TableHeaderCell>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default memo(MyUrls);
