import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import s from './Layout.module.scss';

interface LayoutProps {
  className?: string;
}

const Layout = ({ children, className }: PropsWithChildren<LayoutProps>) => {
  return (
    <motion.main
      className={clsx(s.root, className)}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ delay: 0, duration: 0.2 }}
    >
      {children}
    </motion.main>
  );
};

export default Layout;
