import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import s from './Badge.module.scss';

interface BadgeProps {
  large?: boolean;
  className?: string;
}

const Badge = ({ large = false, children, className }: PropsWithChildren<BadgeProps>) => {
  return <span className={clsx(s.root, large && s.large, className)}>{children}</span>;
};

export default Badge;
