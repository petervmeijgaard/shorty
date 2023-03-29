import { PropsWithChildren, useCallback, useMemo, useReducer } from 'react';
import { ModalContext } from './ModalContext';
import { initialState, reducer } from './reducer';
import { ModalComponent, ModalId } from './types';

function ModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const hasModals = useMemo(() => state.length > 0, [state]);

  const show = useCallback(
    (id: ModalId, component: ModalComponent) =>
      dispatch({
        type: 'SHOW',
        payload: {
          component,
          id,
        },
      }),
    [],
  );

  const hide = useCallback(
    (id: ModalId) =>
      dispatch({
        type: 'HIDE',
        payload: id,
      }),
    [],
  );

  const hideAll = useCallback(() => dispatch({ type: 'HIDE_ALL' }), []);

  const contextValue = useMemo(
    () => ({
      state,
      hasModals,
      show,
      hide,
      hideAll,
    }),
    [state, hasModals, hide, hideAll, show],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
