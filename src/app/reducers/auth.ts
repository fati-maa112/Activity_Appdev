import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
} from '../actions';

interface AuthState {
  data: any | null;
  isLoading: boolean;
  isError: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE: AuthState = {
  data: null,
  isLoading: false,
  isError: false,
};

export default function reducer(state: AuthState = INITIAL_STATE, action: Action): AuthState {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, data: null, isLoading: true, isError: false };

    case USER_LOGIN_COMPLETED:
      return { ...state, data: action.payload, isLoading: false, isError: false };

    case USER_LOGIN_ERROR:
      return { ...state, data: null, isLoading: false, isError: true };

    case USER_LOGIN_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = (payload: any) => ({ type: USER_LOGIN, payload });
export const resetLogin = () => ({ type: USER_LOGIN_RESET });