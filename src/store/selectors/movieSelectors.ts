import type { RootStore } from '@/types/RootStore.ts';

export const selectMovies = (state: RootStore) => state.movie.movies;
