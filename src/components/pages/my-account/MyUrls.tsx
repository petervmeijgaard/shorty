import cn from 'classnames';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import Shimmer from '@/components/ui/Shimmer';
import { api, RouterOutputs } from '@/utils/api';

type SuccessStateProps = {
  data: RouterOutputs['shorty']['myUrls'];
};

const SuccessState: FC<SuccessStateProps> = ({ data }) => {
  if (!data.length) {
    return (
      <tr>
        <td className="p-2 font-light text-neutral-700" colSpan={3}>
          No URLs shortened yet
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map(url => (
        <tr key={url.id}>
          <td className="p-2 font-light text-neutral-700">{url.url}</td>
          <td className="p-2 font-light text-neutral-700">
            <Link href={`/${url.shortUrl}`} target="_blank">
              /{url.shortUrl}
            </Link>
          </td>
          <td className="p-2 font-light text-neutral-700">{url.hits}</td>
        </tr>
      ))}
    </>
  );
};

const LoadingState: FC = () => (
  <>
    <tr>
      <td className="p-2">
        <Shimmer className="h-6 w-[250px]" />
      </td>
      <td className="p-2">
        <Shimmer className="h-6 w-[100px]" />
      </td>
      <td className="p-2">
        <Shimmer className="h-6 w-[30px]" />
      </td>
    </tr>
    <tr>
      <td className="p-2">
        <Shimmer className="h-6 w-[250px]" />
      </td>
      <td className="p-2">
        <Shimmer className="h-6 w-[100px]" />
      </td>
      <td className="p-2">
        <Shimmer className="h-6 w-[30px]" />
      </td>
    </tr>
  </>
);

const ErrorState = () => (
  <tr>
    <td className="p-2 font-light text-neutral-700" colSpan={3}>
      Something went wrong and loading the URLs failed.
    </td>
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
            <td className="p-2 font-bold">URL</td>
            <td className="p-2 font-bold">Code</td>
            <td className="p-2 font-bold">Hits</td>
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
