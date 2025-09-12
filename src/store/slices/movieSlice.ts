import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TakeableChannel } from 'redux-saga';

import type { Movie, MovieStore } from '@/types/Movie.ts';

const initialState: MovieStore = {
  movies: [],
  quickViewMovieId: null,
  deleteMovie: null,
  editMovie: null,
  search: '',
  isLoading: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    editMovie: (state, action: PayloadAction<Movie>) => {
      const movieIndex = state.movies.findIndex((movie) => movie.id === action.payload.id);

      state.movies[movieIndex] = action.payload;
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
    fetchMoviesRequest: (state) => {
      state.isLoading = true;
    },
    fetchMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.isLoading = false;
    },
    createMovieRequest: (state, action: PayloadAction<Movie>) => {},
    createMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    deleteMovieRequest: (state, action: PayloadAction<string>) => {},
    deleteMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
    },
  },
});

export const {
  setQuickViewMovieId,
  setEditMovie,
  setDeleteMovie,
  editMovie,
  setSearch,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  createMovieRequest,
  createMovieSuccess,
  deleteMovieRequest,
  deleteMovieSuccess,
} = movieSlice.actions;
export default movieSlice.reducer;
