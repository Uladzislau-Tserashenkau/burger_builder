import React from "react";
import "./BuildControl.scss";

const BuildControl = (props) => {
  return (
    <div className={"build-control"}>
      <div className={"label"}>{props.label}</div>
      <button
        className={"button button_less"}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={"button button_more"} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
