import { Provider } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { memo } from 'react';
import GoogleIcon from '~icons/ri/google-fill.jsx';
import LockIcon from '~icons/ri/lock-fill.jsx';
import Button from '@/components/ui/Button';

const iconMap = {
  google: GoogleIcon,
  default: LockIcon,
} as const;

type IconNames = keyof typeof iconMap;

function ProviderLoginButton({ name, id }: Provider) {
  const Icon = iconMap[id as IconNames] || iconMap.default;

  return (
    <Button
      key={name}
      type="button"
      onClick={() => void signIn(id)}
      className="w-full flex-1 gap-4"
    >
      <Icon />
      <span>Sign in with {name}</span>
    </Button>
  );
}

export default memo(ProviderLoginButton);
