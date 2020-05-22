import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import Aux from "../../hoc/ax";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, [props]);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
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
    props.onInitPurchase();
    props.history.push({ pathname: "/checkout" });
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;
  let orderSummary = null;
  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          isAuth={props.isAuthenticated}
          ordered={purchaseHandler}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchase(props.ings)}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        purchaseClosed={purchaseCloseHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={props.ings}
        price={props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDisptatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch(actions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      dispatch(actions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(actions.initIngredients());
    },
    onInitPurchase: () => {
      dispatch(actions.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => {
      dispatch(actions.setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDisptatchToProps
)(withErrorHandler(BurgerBuilder, axios));
