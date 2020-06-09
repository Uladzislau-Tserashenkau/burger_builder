import React, { ReactNode } from "react";
import classes from "./BuildControl.module.css";

type Props = {
  label: String;
  removed: () => void;
  disabled: boolean;
  added: () => void;
};

const BuildControl = (props: Props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
