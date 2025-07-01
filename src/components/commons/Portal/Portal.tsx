import { createPortal } from 'react-dom';

import type { PropsWithChildren } from 'react';

interface PortalProps {
  element?: HTMLElement;
}

const Portal = ({ children, element = document.body }: PropsWithChildren<PortalProps>) => {
  return createPortal(children, element);
};

export default Portal;
