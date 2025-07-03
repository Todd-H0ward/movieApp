import { CircleX } from 'lucide-react';

import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import type { ChangeEvent } from 'react';

import s from './ImageInput.module.scss';

interface ImageInputProps {
  image?: string;
  onChange?: (image: string) => void;
  error?: string;
  className?: string;
}

const ImageInput = ({ image, onChange, error, className }: ImageInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <div className={s.root}>
      <Input
        className={className}
        label="Ссылка на изображение"
        placeholder="https://example.com/example"
        value={image}
        onChange={handleInputChange}
        error={error}
      />

      {image && (
        <div className={s.preview}>
          <img
            src={image}
            alt="Превью"
            className={s.image}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <Button type="button" variant="clear" className={s.clear} onClick={handleClear} title="Очистить">
            <CircleX size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
