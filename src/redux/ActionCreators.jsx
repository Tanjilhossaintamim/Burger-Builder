import axios from "axios";
import * as actionTypes from "./ActionTypes";

export const add_ingrediant = (igType) => {
  return {
    type: actionTypes.ADD_INGREDIANT,
    payload: igType,
  };
};

export const remove_ingrediant = (igType) => {
  return {
    type: actionTypes.REMOVE_INGREDIANT,
    payload: igType,
  };
};

export const updata_purcsheable = () => {
  return {
    type: actionTypes.UPDATE_PURCSHEABLE,
  };
};

export const resetStore = () => {
  return {
    type: actionTypes.RESET_STORE,
  };
};

const load_orders = (orders) => {
  return {
    type: actionTypes.LOAD_ORDERS,
    payload: orders,
  };
};

const order_load_error = (message) => {
  return {
    type: actionTypes.ORDER_LOAD_ERROR,
    payload: message,
  };
};

export const fetchOrder = (token, userId) => (dispatch) => {
  const quaryPrams = '&orderBy="userId"&equalTo="' + userId + '"';

  axios
    .get(
      "https://burger-builder-ac0e1-default-rtdb.firebaseio.com/orders.json?auth=" +
        token +
        quaryPrams
    )
    .then((response) => dispatch(load_orders(response.data)))
    .catch((err) => {
      dispatch(order_load_error(err.response.data.error));
    });
};
