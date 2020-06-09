import React from "react";
import "./BuildControl.scss";

const BuildControl = (props) => {
  return (
    <div className={"build-control"}>
      <div className={"build-control__label"}>{props.label}</div>
      <button
        className={"ctrl-button ctrl-button_less"}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={"ctrl-button ctrl-button_more"} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
