import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_RESET,
} from '../actions';

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  isError: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case USER_LOGIN_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    case USER_REGISTER_SUCCESS:
      return { ...state, isLoading: false };

    case USER_LOGIN_FAILURE:
    case USER_REGISTER_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case USER_LOGIN_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = payload => ({
  type: USER_LOGIN,
  payload,
});


export const resetLogin = () => ({
  type: USER_LOGIN_RESET
});