import * as actionTypes from '../actionTypes';
import axios from '../../axios';

// Sign In
export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};
export const signInSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const signInFail = error => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error,
  };
};

// Sign Up
export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};

export const signUpSuccess = () => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
  };
};
export const signUpFail = error => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    error,
  };
};

// Log Out
export const authLogOut = () =>{
  return {
    type: actionTypes.LOG_OUT,
  };
}



// Sending Requests to API
export const signIn = (email, password,changeRoute) => {
  return dispatch => {
    dispatch(signInStart());

    const authData = {
      email: email,
      password: password,
    };

    axios
      .post('/api/auth/signin', authData)
      .then(response => {
        if (response.data.message) {
          dispatch(signInFail(response.data.message));
        } else {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          dispatch(signInSuccess(response.data.token, response.data.userId));
          changeRoute()
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(signInFail(error));
      });
  };
};

export const signUp = (data, changeRoute) => {
  return dispatch => {
    dispatch(signUpStart());

    axios
      .post('/api/auth/signup', data)
      .then(response => {
        if (response.data.message) {
          console.log(response.data);
          dispatch(signUpFail(response.data.message));
        } else {
          dispatch(signUpSuccess());
          changeRoute();
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(signUpFail(error));
      });
  };
};

export const logOut = () =>{
  return dispatch =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(authLogOut())
  }
}
