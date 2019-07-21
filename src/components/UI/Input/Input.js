import React from "react";

import styles from "./Input.module.css";

const input = props => {
  let inputElement = null;
  const inputClass = [styles.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClass.push(styles.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={styles.ValidationError}>
        Please enter a valid {props.elementConfig.type}
      </p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div className={styles.Input}>
      {validationError}
      {inputElement}
    </div>
  );
};

export default input;
