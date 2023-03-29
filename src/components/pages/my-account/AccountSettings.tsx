import { memo } from 'react';
import { useModal } from '@/context/ModalContext';
import DeleteAccountModal from '../../modals/DeleteAccountModal';

function AccountSettings() {
  const modal = useModal(DeleteAccountModal);

  return (
    <div className="flex flex-col items-start gap-4">
      <h2 className="text-2xl font-light text-neutral-900">Account Settings</h2>
      <button
        className="rounded border border-red-700 px-3 py-2 text-red-700 transition hover:bg-red-700 hover:text-white"
        onClick={modal.show}
      >
        Delete account
      </button>
    </div>
  );
}

export default memo(AccountSettings);
