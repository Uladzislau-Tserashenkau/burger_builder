import React, { Component } from "react";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import Aux from "../../hoc/ax";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchase(ingredients) {
    let sum = 0;
    for (let key in ingredients) {
      sum += ingredients[key];
    }
    return sum > 0;
  }

  purchaseCloseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({ pathname: "/checkout" });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchase(this.props.ings)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseClosed={this.purchaseCloseHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCloseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};
const mapDisptatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch(burgerBuilderActions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      dispatch(burgerBuilderActions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(burgerBuilderActions.initIngredients());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDisptatchToProps
)(withErrorHandler(BurgerBuilder, axios));
