import * as actionTypes from '../actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

// Sign In
const signInStart = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: null,
    loading: true,
  };
};

const signInSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const signInFail = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: action.error,
    loading: false,
  };
};

// Sign Up
const signUpStart = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: null,
    loading: true,
  };
};

const signUpSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
  };
};
const signUpFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

// Log Out
const logOut = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_START:
      return signInStart(state, action);
    case actionTypes.SIGN_IN_SUCCESS:
      return signInSuccess(state, action);
    case actionTypes.SIGN_IN_FAIL:
      return signInFail(state, action);
    case actionTypes.SIGN_UP_START:
      return signUpStart(state, action);
    case actionTypes.SIGN_UP_SUCCESS:
      return signUpSuccess(state, action);
    case actionTypes.SIGN_UP_FAIL:
      return signUpFail(state, action);
    case actionTypes.LOG_OUT:
      return logOut(state, action);
    default:
      return state;
  }
};

export default reducer;
