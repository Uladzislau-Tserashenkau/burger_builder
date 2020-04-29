import React from "react";
import Aux from "../../../hoc/ax";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Marvelous burger with following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseClosed}>
        CLOSE
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};
export default orderSummary;
