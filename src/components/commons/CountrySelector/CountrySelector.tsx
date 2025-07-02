import { CircleX } from 'lucide-react';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

import Badge from '@/components/commons/Badge';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import s from './CountrySelector.module.scss';

interface CountrySelectorProps {
  countries: string[];
  onChange: (countries: string[]) => void;
  error?: string;
}

const CountrySelector = ({ countries, onChange, error }: CountrySelectorProps) => {
  const [inputValue, setInputValue] = useState('');

  const addCountry = () => {
    const newCountry = inputValue.trim();
    if (!newCountry || countries.includes(newCountry)) return;

    onChange([...countries, newCountry]);
    setInputValue('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCountry();
    }
  };

  const removeCountry = (value: string) => {
    onChange(countries.filter((country) => country !== value));
  };

  return (
    <div className={s.root}>
      <Input
        label="Страна"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        error={error && countries.length === 0 ? error : ''}
      />
      <div className={s.genres}>
        {countries.map((country) => (
          <Badge key={country} large>
            <Button
              type="button"
              variant="clear"
              onClick={() => {
                removeCountry(country);
              }}
            >
              <CircleX size={17} />
            </Button>
            {country}
          </Badge>
        ))}
      </div>
      {error && countries.length > 0 && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default CountrySelector;
