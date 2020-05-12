import * as actionTypes from "./actions";
import Input from "../components/UI/Input/Input";

const initialState = {
  ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 1.3,
  meat: 1.5,
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
        totalPrice:
          oldState.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...oldState,
        ingredients: {
          ...oldState.ingredients,
          [action.ingredientName]:
            oldState.ingredients[action.ingredientName] - 1,
        },
        totalPrice:
          oldState.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    default:
      return oldState;
  }
};

export default reducer;
