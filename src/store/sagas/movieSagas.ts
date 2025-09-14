import { call, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '@/types/Movie.ts';

import {
  createMovieRequest,
  createMovieSuccess,
  deleteMovieRequest,
  deleteMovieSuccess,
  editMovieRequest,
  editMovieSuccess,
  fetchMovieRequest,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMovieSuccess,
} from '@/store/slices/movieSlice.ts';

import { API } from '@/api';

export function* fetchMoviesWorker(): any {
  try {
    const response = yield call(API.get, '/movies');
    yield put(fetchMoviesSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchMovieWorker(action: PayloadAction<string>): any {
  try {
    const response = yield call(API.get, `/movies/${action.payload}`);
    yield put(fetchMovieSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* createMoviesWorker(action: PayloadAction<Movie>): any {
  try {
    const response = yield call(API.post, '/movies', action.payload);
    yield put(createMovieSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* deleteMoviesWorker(action: PayloadAction<string>): any {
  try {
    const response = yield call(API.delete, `/movies/${action.payload}`);
    yield put(deleteMovieSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* editMoviesWorker(action: PayloadAction<Movie>): any {
  try {
    const response = yield call(API.put, `/movies/${action.payload.id}`, action.payload);
    yield put(editMovieSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* movieSaga() {
  yield takeEvery(fetchMoviesRequest.type, fetchMoviesWorker);
  yield takeEvery(fetchMovieRequest.type, fetchMovieWorker);
  yield takeEvery(createMovieRequest.type, createMoviesWorker);
  yield takeEvery(deleteMovieRequest.type, deleteMoviesWorker);
  yield takeEvery(editMovieRequest.type, editMoviesWorker);
}
