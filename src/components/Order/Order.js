import React from "react";

import styles from "./Order.module.css";

const order = props => {
  console.log(props);
  return (
    <div className={styles.Order}>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
