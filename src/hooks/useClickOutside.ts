import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<any>, handler: (e: MouseEvent) => void, isPriority = false) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      handler(e);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick, { capture: isPriority });

    return () => {
      window.removeEventListener('click', handleClick, { capture: isPriority });
    };
  }, [ref, handler, isPriority]);
};
