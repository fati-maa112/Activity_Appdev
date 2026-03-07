// auth action types
export const USER_LOGIN_REQUEST    = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS    = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE    = 'USER_LOGIN_FAILURE';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const USER_LOGIN_RESET      = 'USER_LOGIN_RESET';

// action creators
export const userLoginRequest = payload => ({
  type: USER_LOGIN_REQUEST,
  payload,              // { username, password }
});
export const userLoginSuccess = data => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});
export const userLoginFailure = error => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const userRegisterRequest = payload => ({
  type: USER_REGISTER_REQUEST,
  payload,              // { username, email, password }
});
export const userRegisterSuccess = data => ({
  type: USER_REGISTER_SUCCESS,
  payload: data,
});
export const userRegisterFailure = error => ({
  type: USER_REGISTER_FAILURE,
  payload: error,
});

export const resetLogin = () => ({
  type: USER_LOGIN_RESET,
});