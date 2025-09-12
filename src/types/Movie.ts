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
  description: string;
};

export interface MovieStore {
  movies: Movie[];
  quickViewMovieId: string | null;
  editMovie: Movie | null;
  deleteMovie: Movie | null;
  search: string;
  isLoading: boolean;
}
