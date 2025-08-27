import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Movie, MovieStore } from '@/types/Movie.ts';

const initialState: MovieStore = {
  movies: [],
  quickViewMovieId: null,
  deleteMovie: null,
  editMovie: null,
  search: '',
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
    editMovie: (state, action: PayloadAction<Movie>) => {
      const movieIndex = state.movies.findIndex((movie) => movie.id === action.payload.id);

      state.movies[movieIndex] = action.payload;
    },
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
    setQuickViewMovieId: (state, action: PayloadAction<string | null>) => {
      state.quickViewMovieId = action.payload;
    },
    setEditMovie: (state, action: PayloadAction<Movie | null>) => {
      state.editMovie = action.payload;
    },
    setDeleteMovie: (state, action: PayloadAction<Movie | null>) => {
      state.deleteMovie = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { addMovie, setQuickViewMovieId, setEditMovie, setDeleteMovie, editMovie, deleteMovie, setSearch } =
  movieSlice.actions;
export default movieSlice.reducer;
