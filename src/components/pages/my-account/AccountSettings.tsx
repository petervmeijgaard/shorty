import { FC, memo } from 'react';

type Props = {
  onDeleteAccount: () => void;
};

const AccountSettings: FC<Props> = ({ onDeleteAccount }) => (
  <div className="flex flex-col items-start gap-4">
    <h2 className="text-2xl font-light text-neutral-900">Account Settings</h2>
    <button
      className="rounded border border-red-700 py-2 px-3 text-red-700 transition hover:bg-red-700 hover:text-white"
      onClick={onDeleteAccount}
    >
      Delete account
    </button>
  </div>
);

export default memo(AccountSettings);
