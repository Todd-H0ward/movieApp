import { Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import { setSearch } from '@/store/slices/movieSlice.ts';

import { useDebounce } from '@/hooks/useDebounce.ts';

import s from './MovieSearch.module.scss';

const MovieSearch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    const searchValue = router.query?.search as string;

    setSearchValue(searchValue);
    dispatch(setSearch(searchValue));
  }, [dispatch, router.query]);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: debouncedSearch,
      },
    });
  }, [debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue('');
  };

  return (
    <div className={s.root}>
      <Input className={s.input} value={searchValue} onChange={handleInputChange} placeholder="Название фильма" />
      <Button className={s.btn} variant="icon" onClick={clearInput}>
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default MovieSearch;
