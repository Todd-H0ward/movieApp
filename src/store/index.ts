import createSagaMiddleware from '@redux-saga/core';
import { all } from '@redux-saga/core/effects';
import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';

import { movieSaga } from '@/store/sagas/movieSagas.ts';

import type { RootStore } from '../types/RootStore.ts';

import movieSlice from './slices/movieSlice.ts';

const createStore = (initialState?: RootStore) => {
  const rootReducer: ReducersMapObject<RootStore> = {
    movie: movieSlice,
  };

  function* rootSaga() {
    yield all([movieSaga()]);
  }

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore<RootStore>({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof createStore>;

export default createStore;
