import React, { ReactNode } from "react";
import classes from "./Button.module.css";

type Props = {
  disabled: boolean;
  clicked: () => void;
  btnType: string;
  children: ReactNode;
};

const Button = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
