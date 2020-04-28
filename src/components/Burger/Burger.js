import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  let ingredientsComponentsArr = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .flat();

  ingredientsComponentsArr =
    ingredientsComponentsArr.length === 0 ? (
      <p>Please choose ingredients</p>
    ) : (
      ingredientsComponentsArr
    );

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsComponentsArr}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
