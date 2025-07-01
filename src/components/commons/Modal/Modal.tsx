import clsx from 'clsx';

import Portal from '@/components/commons/Portal';

import type { PropsWithChildren, ReactNode } from 'react';

import s from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, title, children, className }: PropsWithChildren<ModalProps>) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={s.root}>
        <div className={s.overlay} onClick={onClose} />
        <div className={clsx(s.modal, className)}>
          {title && <h2 className={s.title}>{title}</h2>}
          <div className={s.content}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
