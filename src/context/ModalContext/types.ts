import { FC } from 'react';

export type ModalId = string;

export type ModalProps = {
  hide: () => void;
};

export type ModalComponent = FC<ModalProps>;

export type Modal = {
  id: ModalId;
  component: ModalComponent;
};

export type State = Modal[];

export type ModalContextType = {
  state: State;
  hasModals: boolean;
  show: (id: ModalId, component: ModalComponent) => void;
  hide: (id: ModalId) => void;
  hideAll: () => void;
};
