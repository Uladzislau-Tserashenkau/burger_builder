import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
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
    case actionTypes.SET_INGREDIENTS:
      return {
        ...oldState,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return { ...oldState, error: true };
    default:
      return oldState;
  }
};

export default reducer;
