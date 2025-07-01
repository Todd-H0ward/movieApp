import { CircleX } from 'lucide-react';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

import Badge from '@/components/commons/Badge';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import s from './GenreSelector.module.scss';

interface GenreSelectorProps {
  genres: string[];
  // eslint-disable-next-line no-unused-vars
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
    const newGenres = genres.filter((genre) => genre !== value);
    onChange(newGenres);
  };

  return (
    <div className={s.root}>
      <Input label="Жанр" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
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
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
};

export default GenreSelector;
