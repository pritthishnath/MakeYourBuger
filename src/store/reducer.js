import * as actions from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.7,
  meat: 1.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingName]
      };
    case actions.REMOVE_ING:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingName]
      };
    default:
      return state;
  }
};

export default reducer;
