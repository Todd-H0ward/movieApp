'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import s from './ImageInput.module.scss';

interface ImageInputProps {
  name: string;
  image?: string;
  onChange?: (image: string) => void;
  error?: string;
  className?: string;
}

const ImageInput = ({ name, image, onChange, error, className }: ImageInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    setIsLoading(true);
    clearErrors(name);

    if (!newValue) {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    onChange?.('');
    setIsLoading(false);
    clearErrors(name);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(name, {
      type: 'manual',
      message: 'Не удалось загрузить изображение. Проверьте ссылку.',
    });
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
      {image && !errors.image?.message && (
        <div className={s.preview}>
          <Image
            className={s.image}
            src={image}
            fill
            alt="Превью"
            decoding="async"
            onLoad={() => {
              setIsLoading(false);
              clearErrors(name);
            }}
            onError={handleImageError}
          />
          {!isLoading && (
            <Button type="button" variant="icon" className={s.clear} onClick={handleClear} aria-label="Очистить">
              <X size={20} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
