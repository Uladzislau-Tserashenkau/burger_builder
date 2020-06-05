import React from "react";
import "./BuildControls.scss";
import BuildControl from "./BuildControl/BuildControl";

type Props = {
  isAuth: boolean;
  price: number;
  ingredientAdded: (a: string) => void;
  ingredientRemoved: (a: string) => void;
  disabled: object[];
  ordered: boolean;
  purchasable: boolean;
};

const controls: { type: string }[] = [
  { type: "salad" },
  { type: "meat" },
  { type: "cheese" },
  { type: "bacon" },
];

const BuildControls = (props: Props): ReactNode => {
  return (
    <div className={"build-controls"}>
      <p>
        Current price: <strong> {props.price.toFixed(2)}$ </strong>
      </p>
      {controls.map((ctrl: { type: string }) => (
        <BuildControl
          key={ctrl.type}
          // type={ctrl.type}
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
        className={"order-button"}
        disabled={!props.purchasable}
      >
        {props.isAuth ? "ORDER NOW" : "Log in to order"}
      </button>
    </div>
  );
};

export default BuildControls;
