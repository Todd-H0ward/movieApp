import { clsx } from 'clsx';
import { CircleX, Plus } from 'lucide-react';
import { type ChangeEvent, type InputHTMLAttributes, type KeyboardEvent, useState } from 'react';

import Badge from '@/components/commons/Badge';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import InputHints from '@/components/commons/InputHints';

import s from './TagsInput.module.scss';

interface TagsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  tags: string[];
  changeTags: (values: string[]) => void;
  label?: string;
  error?: string;
  hints?: string[];
  className?: string;
}

const TagsInput = ({ tags, changeTags, label, error, hints, className, ...props }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (value: string) => {
    const newTag = value.trim();
    if (!newTag || tags.includes(newTag.toLowerCase())) return;

    changeTags([...tags, newTag]);
    setInputValue('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const removeTag = (value: string) => {
    changeTags(tags.filter((tag) => tag !== value));
  };

  const inputHints = hints && inputValue ? hints.filter((hint) => hint.includes(inputValue.toLowerCase())) : [];
  const isHintsVisible = hints?.length && inputHints.length > 0;

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.wrapper}>
        <Input
          className={s.input}
          label={label}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={error && tags.length === 0 ? error : ''}
          {...props}
        />
        <Button
          className={clsx(s.addBtn, error && s.addBtnError)}
          variant="icon"
          type="button"
          disabled={inputValue.length === 0}
          onClick={() => addTag(inputValue)}
        >
          <Plus size={20} />
        </Button>
        {isHintsVisible && <InputHints className={s.hints} hints={inputHints} onClick={addTag} />}
      </div>
      <div className={s.tags}>
        {tags.map((tag) => (
          <Badge key={tag} large>
            <Button
              type="button"
              variant="clear"
              onClick={() => {
                removeTag(tag);
              }}
            >
              <CircleX size={17} />
            </Button>
            {tag}
          </Badge>
        ))}
      </div>
      {error && tags.length > 0 && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default TagsInput;
