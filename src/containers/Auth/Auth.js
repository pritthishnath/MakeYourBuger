import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true
  };

  checkValidity = (value, rules) => {
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

  formInputHandler = (event, id) => {
    const updatedControls = {
      ...this.state.controls,
      [id]: {
        ...this.state.controls[id],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[id].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  signupToggle = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
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
        changed={event => this.formInputHandler(event, formEl.id)}
      />
    ));
    let error = null;
    if (this.props.errMsg) {
      error = <p>{this.props.errMsg}</p>;
    }
    console.log(this.props.errMsg);

    return (
      <div className={styles.Auth}>
        {!this.props.loading ? (
          <form onSubmit={this.submitHandler}>
            {error}
            {form}
            <Button btnType="Success">SUBMIT</Button>
          </form>
        ) : (
          <Spinner />
        )}
        <Button clicked={this.signupToggle} btnType="Danger">
          Switch to {this.state.isSignup ? "Sign in" : "Sign up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errMsg: state.auth.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
