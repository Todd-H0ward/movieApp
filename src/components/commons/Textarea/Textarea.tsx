import { clsx } from 'clsx';
import { type ForwardedRef, forwardRef, type TextareaHTMLAttributes } from 'react';

import s from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label?: string;
  error?: string;
  className?: string;
}

const Textarea = forwardRef(
  ({ name, label, error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className={s.root}>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea ref={ref} className={clsx(s.root, className)} name={name} {...props} />
        {error && <p className={s.error}>{error}</p>}
      </div>
    );
  },
);

export default Textarea;
