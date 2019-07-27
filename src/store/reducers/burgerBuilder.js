import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.7,
  meat: 1.5
};

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingName]: state.ingredients[action.ingName] + 1
  });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingName],
    building: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return addIngredient(state, action);
    case actionTypes.REMOVE_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingName],
        building: true
      };
    case actionTypes.SET_ING:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        building: false
      };
    case actionTypes.FETCH_ING_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
