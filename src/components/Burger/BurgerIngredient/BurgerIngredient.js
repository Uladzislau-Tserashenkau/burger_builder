import React from "react";
import "./BurgerIngredient.scss";
import PropTypes from "prop-types";

const burgerIngerdient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={"burger__bread--bottom"}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={"burger__bread--top"}>
          <div className={"burger__seeds1"}></div>
          <div className={"burger__seeds2"}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={"burger__meat"}></div>;
      break;
    case "cheese":
      ingredient = <div className={"burger__cheese"}></div>;
      break;
    case "bacon":
      ingredient = <div className={"burger__bacon"}></div>;
      break;
    case "salad":
      ingredient = <div className={"burger__salad"}></div>;
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
