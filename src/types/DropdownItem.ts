import { ReactNode } from 'react';

export type DropdownItem = {
  icon?: ReactNode;
  value: string;
  onClick: () => void;
};
