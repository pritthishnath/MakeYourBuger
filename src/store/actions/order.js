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

export const order = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(res => {
        dispatch(purchaseSuccess(res.data.name, orderData));
      })
      .catch(err => {
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

export const fetchOrdersFail = error => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
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
        dispatch(fetchOrdersFail(err.response.statusText));
      });
  };
};

export const modalClosed = () => {
  return {
    type: actionsTypes.MODAL_CLOSED
  };
};
