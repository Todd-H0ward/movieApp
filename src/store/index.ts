import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';

import movieSlice from './slices/movieSlice.ts';

import type { RootStore } from '../types/RootStore.ts';

const createStore = (initialState?: RootStore) => {
  const rootReducer: ReducersMapObject<RootStore> = {
    movie: movieSlice,
  };

  return configureStore<RootStore>({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

export default createStore;
