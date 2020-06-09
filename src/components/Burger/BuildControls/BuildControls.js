import React from "react";
import "./BuildControls.scss";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { type: "salad" },
  { type: "meat" },
  { type: "cheese" },
  { type: "bacon" },
];

const BuildControls = (props) => {
  return (
    <div className={"BuildControls"}>
      <p>
        Current price: <strong> {props.price.toFixed(2)}$ </strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.type}
          type={ctrl.type}
          label={ctrl.type}
          added={() => {
            props.ingredientAdded(ctrl.type);
          }}
          removed={() => {
            props.ingredientRemoved(ctrl.type);
          }}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        onClick={props.ordered}
        className={"OrderButton"}
        disabled={!props.purchasable}
      >
        {props.isAuth ? "ORDER NOW" : "Log in to order"}
      </button>
    </div>
  );
};

export default BuildControls;
