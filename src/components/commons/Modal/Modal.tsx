'use client';

import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type PropsWithChildren, useEffect } from 'react';

import Button from '@/components/commons/Button';
import Portal from '@/components/commons/Portal';

import s from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

const Modal = ({ isOpen, onClose, title, children, className }: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <Portal>
      <AnimatePresence initial={false}>
        {isOpen && (
          <div className={s.root}>
            <motion.div
              className={s.overlay}
              onClick={onClose}
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeIn',
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <motion.div
              className={clsx(s.modal, className)}
              variants={{
                hidden: {
                  top: '75%',
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  top: '50%',
                  transition: {
                    duration: 0.3,
                    type: 'spring',
                    damping: 25,
                    stiffness: 250,
                  },
                },
                exit: {
                  top: '-75%',
                  opacity: 0,
                  transition: {
                    top: {
                      duration: 0.8,
                      ease: 'easeInOut',
                    },
                    opacity: {
                      duration: 0.2,
                      ease: 'easeIn',
                    },
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={s.header}>
                {title && <h2 className={s.title}>{title}</h2>}{' '}
                <Button variant="icon" onClick={onClose}>
                  <X />
                </Button>
              </div>
              <div className={s.content}>{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
