import { API } from '@/api/index.ts';

export const fetchMovies = async () => {
  const response = await API.get('/movies');

  if ('data' in response) {
    return response.data;
  }

  return response;
};
