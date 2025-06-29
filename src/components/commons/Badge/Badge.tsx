import type { PropsWithChildren } from 'react';

import s from './Badge.module.scss';

const Badge = ({ children }: PropsWithChildren) => {
  return <span className={s.root}>{children}</span>;
};

export default Badge;
