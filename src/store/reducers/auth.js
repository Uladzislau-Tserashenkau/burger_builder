import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...oldState,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...oldState,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...oldState,
        token: null,
        userId: null,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return { ...oldState, authRedirectPath: action.path };
    default:
      return oldState;
  }
};

export default reducer;
