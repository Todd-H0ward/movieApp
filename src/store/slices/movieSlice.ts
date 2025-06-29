import { createSlice } from '@reduxjs/toolkit';

import type { MovieStore } from '@/types/entities/Movie.ts';

const initialState: MovieStore = {
  movies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
});

export default movieSlice.reducer;
