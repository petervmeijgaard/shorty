import { useCallback, useContext, useMemo } from 'react';
import { ModalContext } from './ModalContext';
import { ModalComponent } from './types';

const generateId = () => Math.random().toString(36).substring(7);

export const useModal = (Component: ModalComponent) => {
  const id = useMemo(generateId, []);
  const context = useContext(ModalContext);

  const show = useCallback(
    () => context.show(id, Component),
    [Component, context, id],
  );

  const hide = useCallback(() => context.hide(id), [context, id]);

  return {
    show,
    hide,
  };
};

export default useModal;
