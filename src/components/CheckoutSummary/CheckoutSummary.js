import React from "react";

import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you make it very tasty</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <h3>Total Price: {props.price.toFixed(2)} USD</h3>
      <Button btnType="Danger" clicked={props.cancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
