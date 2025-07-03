import { clsx } from 'clsx';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import s from './Button.module.scss';

type ButtonVariants = 'solid' | 'outline' | 'filled' | 'clear' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  className?: string;
}

const variantClasses: Record<ButtonVariants, string> = {
  solid: s.solid,
  outline: s.outline,
  filled: s.filled,
  clear: s.clear,
  icon: s.icon,
};

const Button = ({ variant = 'solid', children, className, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={clsx(s.root, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
