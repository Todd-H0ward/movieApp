import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import s from './InputHints.module.scss';

interface InputHintsProps {
  hints: string[];
  onClick: (value: string) => void;
  className?: string;
}

const InputHints = ({ hints, onClick, className }: InputHintsProps) => {
  return (
    <div className={clsx(s.root, className)}>
      <AnimatePresence mode="popLayout">
        {hints.length > 0 && (
          <motion.ul
            className={s.list}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.15 }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {hints.map((hint) => (
              <motion.li
                key={hint}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  transition: {
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                    mass: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    duration: 0.15,
                  },
                }}
              >
                <span className={s.item} onClick={() => onClick(hint)}>
                  {hint}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputHints;
