import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePurchaseable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        // console.log("ingredients[igKey] :" + ingredients[igKey]);
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        // console.log(sum + el);
        // console.log( "[sum] :" + sum + "[el] :" + el);
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchasingHandler = () => {
    //used for Buy Now button
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onAuthRedirectPath("/checkout");
      props.history.push("/authenticate");
    }
  };

  const purchaseCancelHandler = () => {
    //used for Backdrop & Cancel button in OrderSummary
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientsAdded={props.onIngredientAdded}
          ingredientsRemoved={props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          price={props.price}
          purchaseable={updatePurchaseable(props.ings)}
          isAuth={props.isAuth}
          ordered={purchasingHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
        price={props.price}
      />
    );
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.builder.ingredients,
    price: state.builder.totalPrice,
    error: state.builder.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
    onAuthRedirectPath: path => dispatch(actions.authRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
