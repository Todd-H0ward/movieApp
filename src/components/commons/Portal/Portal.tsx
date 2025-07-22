'use client';

import { useState, type PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  element?: HTMLElement;
}

const Portal = ({ children, element }: PropsWithChildren<PortalProps>) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(element || document.body);
  }, [element]);

  return target && createPortal(children, target);
};

export default Portal;
