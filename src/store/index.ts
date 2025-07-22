import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';

import type { RootStore } from '../types/RootStore.ts';

import movieSlice from './slices/movieSlice.ts';

const createStore = (initialState?: RootStore) => {
  const rootReducer: ReducersMapObject<RootStore> = {
    movie: movieSlice,
  };

  return configureStore<RootStore>({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

export type AppStore = ReturnType<typeof createStore>;

export default createStore;
