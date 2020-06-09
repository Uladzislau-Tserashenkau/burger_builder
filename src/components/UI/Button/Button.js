import React from "react";
import "./Button.scss";

const Button = (props) => {
  let classes = ["common-button"];
  if (props.btnType === "Danger") {
    classes.push("common-button_danger");
  } else if (props.btnType === "Success") {
    classes.push("common-button_success");
  }

  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      className={classes.join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
