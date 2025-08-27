'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { MOVIES_KEY } from '@/constants/storageKeys';
import { moviesData } from '@/stubs/moviesData';

import createStore from '@/store';

import type { AppStore } from '@/store';
import type { PropsWithChildren } from 'react';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const loadData = () => {
      const storedData = localStorage.getItem(MOVIES_KEY);
      const movies = storedData ? JSON.parse(storedData) : moviesData;

      const newStore = createStore({
        movie: {
          movies,
          quickViewMovieId: null,
          editMovie: null,
          deleteMovie: null,
          search: '',
        },
      });

      newStore.subscribe(() => {
        const state = newStore.getState();
        localStorage.setItem(MOVIES_KEY, JSON.stringify(state.movie.movies));
      });

      setStore(newStore);
    };

    if (typeof window !== 'undefined') {
      loadData();
    }
  }, []);

  if (!store) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
