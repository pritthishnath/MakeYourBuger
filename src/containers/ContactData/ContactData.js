import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Button from "../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Input from "../../components/UI/Input/Input";

const ContactData = props => {
  const [state, setState] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      postal: ""
    },
    loading: false
  });

  const orderHandler = event => {
    event.preventDefault();

    setState({ ...state, loading: true });
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: "Prit",
        address: {
          street: "1 Teststreet",
          zip: 23414
        },
        email: "test1@b.com"
      },
      delivery: "Postal"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        console.log(res);
        setState({ ...state, loading: false });
      })
      .catch(err => {
        // console.log(err);
        setState({ ...state, loading: false });
      });
  };

  return (
    <div className={styles.ContactData}>
      <h2>Enter your contact details</h2>
      <form>
        <Input inputtype="input" name="name" placeholder="Name" />
        <Input inputtype="input" name="email" placeholder="Email" />
        <Input inputtype="input" name="street" placeholder="Street" />
        <Input inputtype="input" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={orderHandler}>
          ORDER
        </Button>
      </form>
    </div>
  );
};

export default withRouter(ContactData);
