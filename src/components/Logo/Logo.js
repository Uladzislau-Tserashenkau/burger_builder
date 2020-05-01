import React from "react";
import burgerLogo from "../../assets/images/logo.png";
import classes from "./Logo.module.css";

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="logo" />
    </div>
  );
};

export default logo;
