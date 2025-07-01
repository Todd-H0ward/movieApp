import { CircleX } from 'lucide-react';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

import Badge from '@/components/commons/Badge';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import s from './CountrySelector.module.scss';

interface CountrySelectorProps {
  countries: string[];
  // eslint-disable-next-line no-unused-vars
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
    const newCountries = countries.filter((country) => country !== value);
    onChange(newCountries);
  };

  return (
    <div className={s.root}>
      <Input label="Страна" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
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
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
};

export default CountrySelector;
