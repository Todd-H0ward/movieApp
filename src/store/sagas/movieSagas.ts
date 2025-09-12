import { call, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '@/types/Movie.ts';

import {
  createMovieRequest,
  createMovieSuccess,
  deleteMovieRequest,
  deleteMovieSuccess,
  fetchMoviesRequest,
  fetchMoviesSuccess,
} from '@/store/slices/movieSlice.ts';

import { createMovie, deleteMovie, fetchMovies } from '@/api/movieApi.ts';

export function* fetchMoviesWorker(): any {
  try {
    const response = yield call(fetchMovies);
    yield put(fetchMoviesSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* createMoviesWorker(action: PayloadAction<Movie>): any {
  try {
    const response = yield call(createMovie, action.payload);
    yield put(createMovieSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* deleteMoviesWorker(action: PayloadAction<string>): any {
  try {
    const response = yield call(deleteMovie, action.payload);
    yield put(deleteMovieSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* movieSaga() {
  yield takeEvery(fetchMoviesRequest.type, fetchMoviesWorker);
  yield takeEvery(createMovieRequest.type, createMoviesWorker);
  yield takeEvery(deleteMovieRequest.type, deleteMoviesWorker);
}
