import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return updateObject(state, { purchased: false, error: null });
    case actionTypes.PURCHASE_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
        error: null
      });
    case actionTypes.PURCHASE_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: action.orders,
        error: null
      });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.MODAL_CLOSED:
      return updateObject(state, { error: null });
    default:
      return state;
  }
};

export default reducer;
