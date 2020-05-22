import React, { useEffect, useState, useCallback } from "react";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect, useDispatch, useSelector } from "react-redux";
import Aux from "../../hoc/ax";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });
  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const onIngredientAdded = (ingName) => {
    dispatch(actions.addIngredient(ingName));
  };
  const onIngredientRemoved = (ingName) => {
    dispatch(actions.removeIngredient(ingName));
  };
  const onInitIngredients = useCallback(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);
  const onInitPurchase = () => {
    dispatch(actions.purchaseInit());
  };
  const onSetAuthRedirectPath = (path) => {
    dispatch(actions.setAuthRedirectPath(path));
  };

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const updatePurchase = (ingredients) => {
    let sum = 0;
    for (let key in ingredients) {
      sum += ingredients[key];
    }
    return sum > 0;
  };

  const purchaseCloseHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push({ pathname: "/checkout" });
  };

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Ingredients cant be loaded</p> : <Spinner />;
  let orderSummary = null;
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchase(ings)}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        purchaseClosed={purchaseCloseHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ings}
        price={price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCloseHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
