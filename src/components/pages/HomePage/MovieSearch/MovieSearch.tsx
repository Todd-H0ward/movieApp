import { Trash } from 'lucide-react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import { selectSearch } from '@/store/selectors/movieSelectors.ts';
import { setSearch } from '@/store/slices/movieSlice.ts';

import s from './MovieSearch.module.scss';

const MovieSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const clearInput = () => {
    dispatch(setSearch(''));
  };

  return (
    <div className={s.root}>
      <Input className={s.input} value={search} onChange={handleInputChange} placeholder="Название фильма" />
      <Button className={s.btn} variant="icon" onClick={clearInput}>
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default MovieSearch;
