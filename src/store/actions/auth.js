import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, authData };
};

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const auth = (mail, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email: mail, password, returnSecureToken: true };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLGWjng25srVJW5kLYd4Y1ube27q0U1Cs",
        authData
      )
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
