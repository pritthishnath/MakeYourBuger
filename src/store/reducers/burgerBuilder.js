import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.7,
  meat: 1.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingName]
      };
    case actionTypes.REMOVE_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingName]
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
        totalPrice: 4
      };
    case actionTypes.FETCH_ING_FAILD:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
