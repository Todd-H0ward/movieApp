import { clsx } from 'clsx';
import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';

import type { FieldError } from 'react-hook-form';

import s from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string | FieldError;
  className?: string;
}

const Input = forwardRef(
  (
    { name, label, type = 'text', placeholder, className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={s.root}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          className={clsx(s.input, className)}
          name={name}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
