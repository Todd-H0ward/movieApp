'use client';

import { Provider } from 'react-redux';

import createStore from '@/store';

import type { PropsWithChildren } from 'react';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const store = createStore({
    movie: {
      movies: [],
      movie: null,
      quickViewMovieId: null,
      editMovie: null,
      deleteMovie: null,
      search: '',
      isLoading: false,
    },
  });

  if (!store) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
