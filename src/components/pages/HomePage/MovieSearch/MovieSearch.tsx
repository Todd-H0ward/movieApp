'use client';

import { Trash } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';

import { selectSearch } from '@/store/selectors/movieSelectors.ts';
import { setSearch } from '@/store/slices/movieSlice.ts';

import s from './MovieSearch.module.scss';

const MovieSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const searchValue = searchParams.get('search');

    if (searchValue) {
      dispatch(setSearch(searchValue));
    }
  }, [dispatch, searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const params = new URLSearchParams(searchParams);

    dispatch(setSearch(searchValue));
    params.set('search', searchValue);

    router.push(`${pathname}?${params.toString()}`);
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
