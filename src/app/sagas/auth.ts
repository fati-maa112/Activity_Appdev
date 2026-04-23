import { call, put, takeEvery, CallEffect, PutEffect, TakeEffect } from 'redux-saga/effects';
import { authLogin } from '../api/auth';
import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  UserLoginAction,
} from '../actions';

export function* userLoginAsync(action: UserLoginAction): Generator<
  CallEffect | PutEffect,
  void,
  any
> {
  yield put({ type: USER_LOGIN_REQUEST });
  try {
    const response: any = yield call(authLogin, action.payload);
    yield put({ type: USER_LOGIN_COMPLETED, payload: response });
  } catch (error: any) {
    yield put({ type: USER_LOGIN_ERROR, payload: error.message });
  }
}

export function* watchUserLogin(): Generator<TakeEffect, void, unknown> {
  yield takeEvery(USER_LOGIN, userLoginAsync);
}