import { call, put, takeEvery } from '@redux-saga/core/effects';

import { fetchMoviesRequest, fetchMoviesSuccess } from '@/store/slices/movieSlice.ts';

import { fetchMovies } from '@/api/movieApi.ts';

export function* fetchMoviesWorker(): any {
  try {
    const response = yield call(fetchMovies);
    yield put(fetchMoviesSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* movieSaga() {
  yield takeEvery(fetchMoviesRequest.type, fetchMoviesWorker);
}
