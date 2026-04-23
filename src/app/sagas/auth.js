import { call, put, takeLatest } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from '../actions';

// helpers for hitting your backend; replace the URLs below with real
// endpoints.  If you don't have a backend yet, the saga contains a fallback
// that returns dummy data so the flow still works.
function loginApi({ username, password }) {
  // example: return fetch('https://api.example.com/auth/login', { ... });
  return fetch('https://your.api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}
function registerApi({ username, email, password }) {
  // example: return fetch('https://api.example.com/auth/register', { ... });
  return fetch('https://your.api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
}

function* loginSaga(action) {
  try {
    console.log('loginSaga payload:', action.payload);
    const resp = yield call(loginApi, action.payload);
    if (!resp || !resp.ok) {
      // network failure or placeholder URL – fall back to dummy data
      throw new Error('network error');
    }
    const data = yield resp.json();
    yield put({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    console.warn('loginSaga caught error, using stubbed user', err.message);
    // stub user so navigation still works; remove this block when real api ready
    const dummy = { id: 1, username: action.payload.username };
    yield put({ type: USER_LOGIN_SUCCESS, payload: dummy });
    // if you prefer to fail, uncomment the next line instead:
    // yield put({ type: USER_LOGIN_FAILURE, payload: err.message || 'login failed' });
  }
}

function* registerSaga(action) {
  try {
    const resp = yield call(registerApi, action.payload);
    const data = yield resp.json();
    yield put({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: USER_REGISTER_FAILURE, payload: err.message || 'registration failed' });
  }
}

export default function* rootSaga() {
  yield takeLatest(USER_LOGIN_REQUEST, loginSaga);
  yield takeLatest(USER_REGISTER_REQUEST, registerSaga);
}