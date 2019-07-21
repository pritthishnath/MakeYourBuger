import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "name",
        placeholder: "Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "e-mail",
        placeholder: "E-Mail"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "street",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "zip-code",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        required: true,
        minLen: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "country",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "fastest",
      valid: true
    }
  });
  // const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLen) {
      isValid = value.length >= rules.minLen && isValid;
    }

    return isValid;
  };

  const formInputHandler = (event, id) => {
    const updatedOrderForm = {
      ...orderForm
    };
    // const updatedFormElement = {
    //   ...updatedOrderForm[id]
    // // };
    // updatedFormElement.value = event.target.value;
    updatedOrderForm[id].value = event.target.value;
    updatedOrderForm[id].valid = checkValidity(
      updatedOrderForm[id].value,
      updatedOrderForm[id].validation
    );
    updatedOrderForm[id].touched = true;
    let upformIsValid = true;
    for (let id in updatedOrderForm) {
      upformIsValid = updatedOrderForm[id].valid && upformIsValid;
    }
    setFormIsValid(upformIsValid);
    setOrderForm(updatedOrderForm);
  };

  const orderHandler = event => {
    event.preventDefault();

    const formDate = {};
    for (let formElementName in orderForm) {
      formDate[formElementName] = orderForm[formElementName].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      customerDetails: formDate
    };

    props.onOrder(order);
  };
  const formArray = [];
  for (let key in orderForm) {
    formArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  return (
    <div className={styles.ContactData}>
      <h2>Enter your contact details</h2>
      {!props.loading ? (
        <form onSubmit={orderHandler}>
          {formArray.map(order => (
            <Input
              key={order.id}
              elementType={order.config.elementType}
              elementConfig={order.config.elementConfig}
              value={order.config.value}
              invalid={!order.config.valid}
              shouldValidate={order.config.validation}
              touched={order.config.touched}
              changed={event => formInputHandler(event, order.id)}
            />
          ))}
          <Button btnType="Success" disabled={!formIsValid}>
            ORDER
          </Button>
        </form>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrder: order => dispatch(actions.order(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
