import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import { useState, type MouseEvent, useRef } from 'react';

import { DropdownItem } from '@/types/DropdownItem.ts';

import Button from '@/components/commons/Button';

import { useClickOutside } from '@/hooks/useClickOutside.ts';

import s from './Dropdown.module.scss';

interface DropdownProps {
  items: DropdownItem[];
  className?: string;
}

const Dropdown = ({ items, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    setIsOpen((prev) => !prev);
  };

  useClickOutside(listRef, closeDropdown, true);

  return (
    <div className={clsx(s.root, className)}>
      <Button className={s.btn} variant="icon" onClick={handleClick}>
        <EllipsisVertical />
      </Button>
      {isOpen && (
        <motion.ul
          ref={listRef}
          className={s.list}
          initial={{
            scale: 0,
            transition: {
              delay: 0.15,
            },
          }}
          animate={{
            scale: 1,
            transition: {
              type: 'spring',
              duration: 0.4,
              delayChildren: 0.2,
              staggerChildren: 0.05,
            },
          }}
        >
          {items.map(({ icon, value, onClick }) => (
            <motion.li
              key={value}
              className={s.item}
              onClick={(e: MouseEvent) => {
                e.stopPropagation();

                closeDropdown();
                onClick();
              }}
            >
              {icon} {value}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Dropdown;
