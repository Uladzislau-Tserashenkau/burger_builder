import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = ({ idToken, localId }) => {
  return { type: actionTypes.AUTH_SUCCESS, idToken, userId: localId };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, +expirationTime * 1000);
  };
};

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const auth = (mail, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email: mail, password, returnSecureToken: true };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLGWjng25srVJW5kLYd4Y1ube27q0U1Cs";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLGWjng25srVJW5kLYd4Y1ube27q0U1Cs";
    }
    axios
      .post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};
