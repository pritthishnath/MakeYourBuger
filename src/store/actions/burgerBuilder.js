import * as actionTypes from "./actionTypes";

export const addIngredient = ingname => {
  return {
    type: actionTypes.ADD_ING,
    ingname: ingname
  };
};

export const removeIngredient = ingname => {
  return {
    type: actionTypes.REMOVE_ING,
    ingname: ingname
  };
};
