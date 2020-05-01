import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NaviagtionItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger builder
      </NavigationItem>
      <NavigationItem link="/"> Checkout </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
