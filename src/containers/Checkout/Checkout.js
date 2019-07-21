import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../../components/UI/Spinner/Spinner";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

const Checkout = props => {
  const cancelledHandler = () => {
    props.history.goBack();
  };

  const continuedHandler = () => {
    props.history.push("/checkout/contact-form");
  };

  let checkoutSummary = props.ings ? (
    <div>
      <CheckoutSummary
        ingredients={props.ings}
        price={props.price}
        cancelled={cancelledHandler}
        continued={continuedHandler}
      />
      <Route path={props.match.url + "/contact-form"} component={ContactData} />
    </div>
  ) : (
    <Redirect to="/" />
  );
  return checkoutSummary;
};

const mapStateToProps = state => {
  return {
    ings: state.builder.ingredients,
    price: state.builder.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
