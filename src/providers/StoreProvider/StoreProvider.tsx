import { Provider } from 'react-redux';

import { MOVIES_KEY } from '@/constants/storageKeys.ts';
import { moviesData } from '@/stubs/moviesData.ts';

import type { PropsWithChildren } from 'react';

import createStore from '@/store';

const initialState = JSON.parse(localStorage.getItem(MOVIES_KEY) as string) || moviesData;

const store = createStore({
  movie: {
    movies: initialState,
  },
});

const handleStorageChange = () => {
  const movies = store.getState().movie.movies;

  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
};

store.subscribe(handleStorageChange);

const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
