import { ModalComponent, ModalId, State } from './types';

type ShowAction = {
  type: 'SHOW';
  payload: {
    component: ModalComponent;
    id: ModalId;
  };
};

type HideAction = {
  type: 'HIDE';
  payload: ModalId;
};

type HideAllAction = {
  type: 'HIDE_ALL';
};

type Action = ShowAction | HideAction | HideAllAction;

export const initialState: State = [];

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW':
      return [...state, action.payload];
    case 'HIDE':
      return state.filter(({ id }) => id !== action.payload);
    case 'HIDE_ALL':
      return [];
    default:
      return state;
  }
};
