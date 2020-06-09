import React from "react";
import burgerLogo from "../../assets/images/logo.png";
import "./Logo.scss";

const logo = () => {
  return (
    <div className={"logo"}>
      <img className={"logo__img"} src={burgerLogo} alt="logo" />
    </div>
  );
};

export default logo;
