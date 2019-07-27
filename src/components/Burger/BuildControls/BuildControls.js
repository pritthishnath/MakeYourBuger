import React from "react";

import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const control = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={styles.BuildControls}>
    <p>
      Current Price : <strong>{props.price.toFixed(2)} USD</strong>
    </p>
    {control.map(ctrl => {
      return (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientsAdded(ctrl.type)}
          removed={() => props.ingredientsRemoved(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
        />
      );
    })}
    <button
      className={styles.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

export default buildControls;
