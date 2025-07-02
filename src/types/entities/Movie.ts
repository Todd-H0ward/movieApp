export type Movie = {
  id: string;
  name: string;
  originalName: string;
  year: number;
  countries: string[];
  genres: string[];
  director: string;
  rating: number;
  image: string;
};

export interface MovieStore {
  movies: Movie[];
  quickViewMovieId: string | null;
}
