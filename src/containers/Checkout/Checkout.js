import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Spinner from "../../components/UI/Spinner/Spinner";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

const Checkout = props => {
  const [ingredients, setIngredients] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = null;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    setIngredients(ingredients);
    setPrice(price);
  }, []);

  const cancelledHandler = () => {
    props.history.goBack();
  };

  const continuedHandler = () => {
    props.history.push("/checkout/contact-form");
  };

  let checkoutSummary = ingredients ? (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        price={price}
        cancelled={cancelledHandler}
        continued={continuedHandler}
      />
      <Route
        path={props.match.url + "/contact-form"}
        render={() => <ContactData ingredients={ingredients} price={price} />}
      />
    </div>
  ) : (
    <Spinner />
  );
  return checkoutSummary;
};

export default Checkout;
