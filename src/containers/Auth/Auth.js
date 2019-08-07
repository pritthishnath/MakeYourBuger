import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity, updateObject } from "../../shared/utility";

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isMail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLen: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!props.building && props.authRedirectPath !== "/") {
      props.onAuthRedirectPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formInputHandler = (event, id) => {
    const updatedControls = updateObject(controls, {
      [id]: updateObject(controls[id], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[id].validation),
        touched: true
      })
    });
    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const signupToggle = () => {
    setIsSignup(prevValue => !prevValue);
  };

  const formArray = [];
  for (let key in controls) {
    formArray.push({
      id: key,
      config: controls[key]
    });
  }
  const form = formArray.map(formEl => (
    <Input
      key={formEl.id}
      elementType={formEl.config.elementType}
      elementConfig={formEl.config.elementConfig}
      value={formEl.config.value}
      invalid={!formEl.config.valid}
      shouldValidate={formEl.config.validation}
      touched={formEl.config.touched}
      changed={event => formInputHandler(event, formEl.id)}
    />
  ));
  let error = null;
  if (props.errMsg) {
    error = <p>{props.errMsg}</p>;
  }
  let auth = null;
  if (props.isAuth) {
    auth = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {!props.loading ? (
        <form onSubmit={submitHandler}>
          {auth}
          {error}
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      ) : (
        <Spinner />
      )}
      <Button clicked={signupToggle} btnType="Danger">
        Switch to {isSignup ? "Sign in" : "Sign up"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errMsg: state.auth.errorMessage,
    isAuth: state.auth.token !== null,
    building: state.builder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onAuthRedirectPath: () => dispatch(actions.authRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
