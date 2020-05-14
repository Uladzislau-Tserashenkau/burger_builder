import * as actionTypes from "../actions/actionTypes";
import { act } from "react-dom/test-utils";

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return { ...oldState, loading: true };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...oldState,
        loading: false,
        orders: oldState.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...oldState,
        loading: false,
      };
    default:
      return oldState;
  }
};
