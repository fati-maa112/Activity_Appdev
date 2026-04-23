export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_COMPLETED = 'USER_LOGIN_COMPLETED';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';

export interface UserLoginAction {
  type: typeof USER_LOGIN;
  payload: any;
}

export interface UserLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST;
}

export interface UserLoginCompletedAction {
  type: typeof USER_LOGIN_COMPLETED;
  payload: any;
}

export interface UserLoginErrorAction {
  type: typeof USER_LOGIN_ERROR;
  payload: string;
}

export interface UserLoginResetAction {
  type: typeof USER_LOGIN_RESET;
}

export type AuthActionTypes =
  | UserLoginAction
  | UserLoginRequestAction
  | UserLoginCompletedAction
  | UserLoginErrorAction
  | UserLoginResetAction;