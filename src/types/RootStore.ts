import type { MovieStore } from './entities/Movie.ts';

export interface RootStore {
  movie: MovieStore;
}
