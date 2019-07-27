import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
// import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders();
  }, []);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        price={+order.price}
        ingredients={order.ingredients}
      />
    ));
  }

  return orders;
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
