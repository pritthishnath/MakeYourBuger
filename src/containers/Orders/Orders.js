import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
// import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const Orders = props => {
  const { orders, loading, token, userId, onFetchOrders } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let showOrders = <Spinner />;
  if (!loading) {
    showOrders = orders.map(order => (
      <Order
        key={order.id}
        price={+order.price}
        ingredients={order.ingredients}
      />
    ));
  }
  return <Aux>{showOrders}</Aux>;
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
