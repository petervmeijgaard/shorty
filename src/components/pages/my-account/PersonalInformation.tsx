import cn from 'classnames';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import LogoutIcon from '~icons/ri/logout-box-r-line.jsx';
import Shimmer from '@/components/ui/Shimmer';

const LoadingState: FC = () => (
  <>
    <Shimmer className="h-[200px] w-[200px]" />
    <div className="flex flex-col gap-2">
      <Shimmer className="h-6 w-full" />
      <Shimmer className="h-4 w-full" />
    </div>
  </>
);

const AuthenticatedState: FC<Session> = ({ user }) => (
  <>
    {user?.image && (
      <Image
        src={user.image}
        alt="Profile picture"
        className="w-full rounded"
        width={200}
        height={200}
        priority
      />
    )}
    <div>
      <h2 className="text-xl font-light text-neutral-900">
        {user?.name || 'No name given'}
      </h2>
      {user?.email && (
        <span className="text-sm font-light text-neutral-700">
          {user.email}
        </span>
      )}
    </div>
  </>
);

const PersonalInformation: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => {
  const session = useSession();

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {session.status === 'loading' && <LoadingState />}
      {session.status === 'authenticated' && (
        <AuthenticatedState {...session.data} />
      )}
      <button
        className="flex flex-row items-center justify-center gap-3 rounded border border-neutral-700 py-2 px-3 text-neutral-700 transition hover:bg-neutral-700 hover:text-white"
        disabled={session.status === 'loading'}
        onClick={() => void signOut()}
      >
        <LogoutIcon /> Sign out
      </button>
    </div>
  );
};

export default memo(PersonalInformation);
