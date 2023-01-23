import React, { memo, useContext, useRef } from 'react';
import FadeTransition from '@/components/transitions/FadeTransition';
import Overlay from '@/components/ui/Overlay';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { ModalContext } from './ModalContext';

const ModalContainer = () => {
  const ref = useRef(null);
  const { state, hide, hideAll, hasModals } = useContext(ModalContext);

  useOnClickOutside(ref, hideAll);

  return (
    <FadeTransition isVisible={hasModals}>
      <Overlay>
        {state.map(({ component: Modal, id }) => (
          <div key={id} ref={ref}>
            <Modal hide={() => hide(id)} />
          </div>
        ))}
      </Overlay>
    </FadeTransition>
  );
};

export default memo(ModalContainer);
