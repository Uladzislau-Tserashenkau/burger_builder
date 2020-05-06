import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      bacon: 2,
      meat: 0,
    },
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let p of params.entries()) {
      ingredients[p[0]] = +p[1];
    }

    this.setState({ ingredients });
  }

  checkoutBackHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutBack={this.checkoutBackHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
        />
      </div>
    );
  }
}

export default Checkout;
