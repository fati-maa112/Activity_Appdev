import authSaga from './auth';

// root saga simply delegates to the auth module (which exports a default saga)
export default function* rootSaga() {
  // if you later add more sagas you can combine with `all([...])`
  yield authSaga();
}