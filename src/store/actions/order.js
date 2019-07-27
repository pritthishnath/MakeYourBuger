import * as actionsTypes from "./actionTypes";
import axios from "axios";

export const initPurchase = () => {
  return {
    type: actionsTypes.INIT_PURCHASE
  };
};

export const purchaseStart = () => {
  return {
    type: actionsTypes.PURCHASE_START
  };
};

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionsTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseFail = error => {
  return {
    type: actionsTypes.PURCHASE_FAIL,
    error: error
  };
};

export const order = orderData => {
  return dispatch => {
    dispatch(purchaseStart());
    axios
      .post("/orders.json", orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseSuccess(res.data.name, orderData));
      })
      .catch(err => {
        // console.log(err)
        dispatch(purchaseFail(err));
      });
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionsTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionsTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = () => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail());
      });
  };
};
