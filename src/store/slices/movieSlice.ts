import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Movie, MovieStore } from '@/types/entities/Movie.ts';

const initialState: MovieStore = {
  movies: [],
  quickViewMovieId: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      if (state.movies.find((movie) => movie.name === action.payload.name)) {
        return;
      }

      state.movies.push(action.payload);
    },
    setQuickViewMovieId: (state, action: PayloadAction<string | null>) => {
      state.quickViewMovieId = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { addMovie, setQuickViewMovieId } = movieSlice.actions;
