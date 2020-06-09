import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.scss";

const CheckoutSummary = (props) => {
  return (
    <div className={"checkout-summary"}>
      <h1>We hope u like it!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.onCheckoutBack} btnType="Danger">
        I changed my mind
      </Button>
      <Button clicked={props.onCheckoutContinue} btnType="Success">
        Proceed
      </Button>
    </div>
  );
};

export default CheckoutSummary;
