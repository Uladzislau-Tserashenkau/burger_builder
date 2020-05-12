import * as actionTypes from "./actions";

const initialState = {
  ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
  totalPrice: 4,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...oldState,
        ingredients: {
          ...oldState.ingredients,
          [action.ingredientName]:
            oldState.ingredients[action.ingredientName] + 1,
        },
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...oldState,
        ingredients: {
          ...oldState.ingredients,
          [action.ingredientName]:
            oldState.ingredients[action.ingredientName] - 1,
        },
      };
    default:
      return oldState;
  }
};

export default reducer;
