import { signOut } from 'next-auth/react';
import { useCallback, useRef, FC, memo } from 'react';
import LoadingIcon from '~icons/eos-icons/bubble-loading.jsx';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { api } from '@/utils/api';

type Props = {
  onCloseModal: () => void;
};

const DeleteAccountModal: FC<Props> = ({ onCloseModal }) => {
  const modalRef = useRef(null);
  const deleteAccount = api.shorty.deleteAccount.useMutation();

  const onConfirm = useCallback(() => {
    deleteAccount.mutate(undefined, {
      onSuccess: () => void signOut(),
    });
  }, [deleteAccount]);

  useOnClickOutside(modalRef, onCloseModal);

  return (
    <div className="flex flex-col rounded bg-white" ref={modalRef}>
      <div className="rounded-t bg-red-700 p-4">
        <h3 className="text-xl font-light text-white">Delete account</h3>
      </div>
      <p className="p-4">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <hr className="border-t border-dotted border-neutral-400" />
      <div className="flex gap-2 p-4">
        <button
          className="flex flex-row items-center gap-2 rounded border border-red-700 py-2 px-3 text-red-700 transition hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-red-700"
          onClick={onConfirm}
          disabled={deleteAccount.isLoading}
        >
          {deleteAccount.isLoading ? <LoadingIcon /> : <>Confirm</>}
        </button>
        <button
          className="flex flex-row items-center gap-2 rounded border border-neutral-700 py-2 px-3 text-neutral-700 transition hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-700"
          onClick={onCloseModal}
          disabled={deleteAccount.isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default memo(DeleteAccountModal);
