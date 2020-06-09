import React from "react";
import "./BurgerIngredient.scss";
import PropTypes from "prop-types";

const burgerIngerdient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={"burger_bread-bottom"}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={"burger_bread-top"}>
          <div className={"burger_seeds1"}></div>
          <div className={"burger_seeds2"}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={"burger_meat"}></div>;
      break;
    case "cheese":
      ingredient = <div className={"burger_cheese"}></div>;
      break;
    case "bacon":
      ingredient = <div className={"burger_bacon"}></div>;
      break;
    case "salad":
      ingredient = <div className={"burger_salad"}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

burgerIngerdient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngerdient;
