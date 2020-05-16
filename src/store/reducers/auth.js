import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
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
    default:
      return oldState;
  }
};

export default reducer;
