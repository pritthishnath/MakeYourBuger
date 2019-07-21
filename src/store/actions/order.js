import * as actionsTypes from "./actionTypes";
import axios from "axios";

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

export const purchaseStart = () => {
  return {
    type: actionsTypes.PURCHASE_START
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
