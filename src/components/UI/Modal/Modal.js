import React from "react";

import styles from "./Modal.module.css";

const modal = props => (
  <div
    className={styles.Modal}
    style={{
      transform: props.show ? "transformY(0)" : "transformY(-200vh)",
      opacity: props.show ? "1" : "0"
    }}
  >
    {props.children}
  </div>
);

export default modal;
