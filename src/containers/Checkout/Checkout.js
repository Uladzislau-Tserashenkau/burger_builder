import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let p of params.entries()) {
      if (p[0] === "price") {
        price = +p[1];
      } else {
        ingredients[p[0]] = +p[1];
      }
    }

    this.setState({ ingredients, totalPrice: price });
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
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
