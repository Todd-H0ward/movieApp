import { createSelector } from '@reduxjs/toolkit';

import type { RootStore } from '@/types/RootStore.ts';

export const selectMovies = (state: RootStore) => state.movie.movies;
export const selectQuickViewMovieId = (state: RootStore) => state.movie.quickViewMovieId;
export const selectEditMovie = (state: RootStore) => state.movie.editMovie;

export const selectQuickViewMovie = createSelector(
  [selectMovies, selectQuickViewMovieId],
  (movies, quickViewMovieId) => {
    return quickViewMovieId ? movies.find((movie) => movie.id === quickViewMovieId) : null;
  },
);
