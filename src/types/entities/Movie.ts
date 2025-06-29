export type Movie = {
  id: string;
  name: string;
  originalName: string;
  year: number;
  countries: string[];
  genres: string[];
  director: string;
  ageLimit: number;
  rating: number;
  image: string;
};

export interface MovieStore {
  movies: Movie[];
}
