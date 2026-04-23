import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { watchUserLogin } from './auth';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    watchUserLogin(),
  ]);
}