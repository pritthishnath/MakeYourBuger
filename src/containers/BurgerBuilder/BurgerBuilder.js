import React from "react";
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

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false, //for Order Summary pop-up
    loading: false,
    error: null
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseable = ingredients => {
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

  // addIngredientsHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseable(updatedIngredients);
  // };

  // removeIngredientsHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseable(updatedIngredients);
  // };

  purchasingHandler = () => {
    //used for Buy Now button
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    //used for Backdrop & Cancel button in OrderSummary
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseable(this.props.ings)}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
