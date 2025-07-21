import { clsx } from 'clsx';
import { PropsWithChildren } from 'react';

import StoreProvider from '@/providers/StoreProvider';

import s from './Layout.module.scss';

interface LayoutProps {
  className?: string;
}

const Layout = ({ children, className }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={clsx(s.root, className)}>
      <StoreProvider>{children}</StoreProvider>
    </div>
  );
};

export default Layout;
