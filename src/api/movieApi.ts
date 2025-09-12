import { Movie } from '@/types/Movie.ts';

import { API } from '@/api/index.ts';

export const fetchMovies = async () => {
  const response = await API.get('/movies');

  if ('data' in response) {
    return response.data;
  }

  return response;
};

export const createMovie = async (movie: Movie) => {
  const response = await API.post('/movies', movie);

  if ('data' in response) {
    return response.data;
  }

  return response;
};

export const deleteMovie = async (movieId: string) => {
  const response = await API.delete(`/movies/${movieId}`);

  if ('data' in response) {
    return response.data;
  }

  return response;
};
