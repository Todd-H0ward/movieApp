import { createSelector } from '@reduxjs/toolkit';

import type { RootStore } from '@/types/RootStore.ts';

export const moviesRootSelector = (state: RootStore) => state.movie;
export const selectMovies = createSelector(moviesRootSelector, ({ movies }) => movies);
export const selectQuickViewMovieId = createSelector(moviesRootSelector, ({ quickViewMovieId }) => quickViewMovieId);
export const selectEditMovie = createSelector(moviesRootSelector, ({ editMovie }) => editMovie);
export const selectSearch = createSelector(moviesRootSelector, ({ search }) => search);

export const selectQuickViewMovie = createSelector(
  [selectMovies, selectQuickViewMovieId],
  (movies, quickViewMovieId) => {
    return quickViewMovieId ? movies.find((movie) => movie.id === quickViewMovieId) : null;
  },
);

export const selectSearchedMovies = createSelector([selectMovies, selectSearch], (movies, search) => {
  return movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase()) ||
      movie.originalName.toLowerCase().includes(search.toLowerCase()),
  );
});
