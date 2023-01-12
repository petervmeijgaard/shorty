import cn from 'classnames';
import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import { api } from '@/utils/api';
import DataTableRow from './DataTableRow';
import ErrorTableRow from './ErrorTableRow';
import HeaderTableCell from './HeaderTableCell';
import LoadingTableRow from './LoadingTableRow';
import NotFoundTableRow from './NotFoundTableRow';

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

    return query.data.map(url => <DataTableRow key={url.shortUrl} {...url} />);
  }, [query]);

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <h2 className="text-2xl font-light text-neutral-900">My Shorty URLs</h2>
      <table className="table-auto">
        <thead>
          <tr className="border-b border-dotted">
            <HeaderTableCell className="p-2 font-bold">URL</HeaderTableCell>
            <HeaderTableCell className="p-2 font-bold">Code</HeaderTableCell>
            <HeaderTableCell className="p-2 font-bold">Hits</HeaderTableCell>
            <HeaderTableCell className="p-2 font-bold" />
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default memo(MyUrls);
