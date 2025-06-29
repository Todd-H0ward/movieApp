import { configureStore } from '@reduxjs/toolkit';

import movieSlice from './slices/movieSlice.ts';

const createStore = () => {
  const rootReducer = {
    task: movieSlice,
  };

  return configureStore({
    reducer: rootReducer,
  });
};

export default createStore;
