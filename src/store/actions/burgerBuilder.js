import axios from "axios";

import * as actionTypes from "./actionTypes";

export const addIngredient = ingname => {
  return {
    type: actionTypes.ADD_ING,
    ingName: ingname
  };
};

export const removeIngredient = ingname => {
  return {
    type: actionTypes.REMOVE_ING,
    ingName: ingname
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_ING,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_ING_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
