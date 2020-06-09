import React from "react";
import "./Input.scss";

const Input = (props) => {
  let inputElem = null;
  const inputClasses = ["user-input__field"];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("user-input__field_invalid");
  }
  switch (props.elementType) {
    case "input":
      inputElem = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElem = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElem = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={"user-input"}>
      <label className={"user-input__label"}>{props.label}</label>
      {inputElem}
    </div>
  );
};

export default Input;
