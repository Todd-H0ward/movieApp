import { CircleX } from 'lucide-react';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

import Badge from '@/components/commons/Badge';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import s from './GenreSelector.module.scss';

interface GenreSelectorProps {
  genres: string[];
  onChange: (genres: string[]) => void;
  error?: string;
}

const GenreSelector = ({ genres, onChange, error }: GenreSelectorProps) => {
  const [inputValue, setInputValue] = useState('');

  const addGenre = () => {
    const newGenre = inputValue.trim();
    if (!newGenre || genres.includes(newGenre)) return;

    onChange([...genres, newGenre]);
    setInputValue('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addGenre();
    }
  };

  const removeGenre = (value: string) => {
    onChange(genres.filter((genre) => genre !== value));
  };

  return (
    <div className={s.root}>
      <Input
        label="Жанр"
        placeholder="Выберите жанры"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        error={error && genres.length === 0 ? error : ''}
      />
      <div className={s.genres}>
        {genres.map((genre) => (
          <Badge key={genre} large>
            <Button
              type="button"
              variant="clear"
              onClick={() => {
                removeGenre(genre);
              }}
            >
              <CircleX size={17} />
            </Button>
            {genre}
          </Badge>
        ))}
      </div>
      {error && genres.length > 0 && <div className={s.error}>{error}</div>}
    </div>
  );
};

export default GenreSelector;
