import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../../components/UI/Input/Input";
import { withRouter } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import classes from "./ContactData.module.css";
import withErrorHandler from "../../../hoc/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your name" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "ZIP code" },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your country" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "Your email" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
    updatedOrderForm[inputIdentifier].value = event.target.value;
    updatedOrderForm[inputIdentifier].valid = this.checkValidity(
      updatedOrderForm[inputIdentifier].value,
      updatedOrderForm[inputIdentifier].validation
    );
    updatedOrderForm[inputIdentifier].touched = true;

    let formValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formValid = updatedOrderForm[inputIdentifier].valid && formValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formValid });
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData,
    };
    this.props.onOrderBurger(order);
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => {
              this.inputChangedHandler(event, formElement.id);
            }}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order now
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => {
      dispatch(actions.purchaseBurger(orderData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(ContactData), axios));
