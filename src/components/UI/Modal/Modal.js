import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.show !== this.props.show || nextProps.children !== this.props.children
    )
  }
  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

export default Modal;
