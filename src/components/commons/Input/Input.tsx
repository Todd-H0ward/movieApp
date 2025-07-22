import { clsx } from 'clsx';
import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';

import s from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef(
  ({ name, label, error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={s.root}>
        {label && <label htmlFor={name}>{label}</label>}
        <input ref={ref} className={clsx(s.input, className)} name={name} {...props} />
        {error && <p className={s.error}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
