import React, { useState, useEffect } from "react";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

const Checkout = props => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    bacon: 1,
    cheese: 1,
    meat: 1
  });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    setIngredients(ingredients);
  }, [props.location.search]);

  const cancelledHandler = () => {
    props.history.goBack();
  };

  const continuedHandler = () => {
    props.history.push("/checkout/contact-form");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        cancelled={cancelledHandler}
        continued={continuedHandler}
      />
    </div>
  );
};

export default Checkout;
