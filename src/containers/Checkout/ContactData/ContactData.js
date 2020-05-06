import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    adress: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      customer: {
        name: "Vlad",
        adress: {
          street: "SomeStreet",
          zipCode: 231412,
          country: "Switzerland",
        },
        email: "somemail@mail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="postal" placeholder="Your postal code" />
        <Button clicked={this.orderHandler} btnType="Success">
          Order now
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
