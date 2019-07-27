import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
// import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token);
  }, []);
  let error = false;
  if (props.error) {
    error = true;
  }

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

  return (
    <Aux>
      <Modal show={error} modalClosed={props.onModalClosed}>
        Unauthorized Access
      </Modal>
      {orders}
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actions.fetchOrders(token)),
    onModalClosed: () => dispatch(actions.modalClosed())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
