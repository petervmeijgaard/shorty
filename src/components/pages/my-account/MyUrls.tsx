import cn from 'classnames';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import Shimmer from '@/components/ui/Shimmer';
import TableBodyCell from '@/components/ui/TableBodyCell';
import TableHeaderCell from '@/components/ui/TableHeaderCell';
import { api, RouterOutputs } from '@/utils/api';

type SuccessStateProps = {
  data: RouterOutputs['shorty']['myUrls'];
};

const SuccessState: FC<SuccessStateProps> = ({ data }) => {
  if (!data.length) {
    return (
      <tr>
        <TableBodyCell colSpan={3}>No URLs shortened yet</TableBodyCell>
      </tr>
    );
  }

  return (
    <>
      {data.map(url => (
        <tr key={url.id}>
          <TableBodyCell>{url.url}</TableBodyCell>
          <TableBodyCell>
            <Link href={`/${url.shortUrl}`} target="_blank">
              /{url.shortUrl}
            </Link>
          </TableBodyCell>
          <TableBodyCell>{url.hits}</TableBodyCell>
        </tr>
      ))}
    </>
  );
};

const LoadingState: FC = () => (
  <>
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
  </>
);

const ErrorState = () => (
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

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <h2 className="text-2xl font-light text-neutral-900">My Shorty URLs</h2>
      <table className="table-auto">
        <thead>
          <tr className="border-b border-dotted">
            <TableHeaderCell>URL</TableHeaderCell>
            <TableHeaderCell>Code</TableHeaderCell>
            <TableHeaderCell>Hits</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {query.isLoading && <LoadingState />}
          {query.isError && <ErrorState />}
          {query.isSuccess && <SuccessState data={query.data} />}
        </tbody>
      </table>
    </div>
  );
};

export default memo(MyUrls);
