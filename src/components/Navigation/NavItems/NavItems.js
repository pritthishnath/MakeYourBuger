import React from "react";
import { connect } from "react-redux";

import styles from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => (
  <ul className={styles.NavItems}>
    <NavItem link="/">Burger Builder</NavItem>
    {props.isAuth ? <NavItem link="/orders">Orders</NavItem> : null}
    {!props.isAuth ? (
      <NavItem link="/authenticate">Log In</NavItem>
    ) : (
      <NavItem link="/logout">Log Out</NavItem>
    )}
  </ul>
);

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(navItems);
