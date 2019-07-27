import React from "react";
import { connect } from "react-redux";

import styles from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => (
  <ul className={styles.NavItems}>
    <NavItem link="/">Burger Builder</NavItem>
    <NavItem link="/orders">Orders</NavItem>
    {!props.isAuth ? (
      <NavItem link="/authenticate">Authenticate</NavItem>
    ) : (
      <NavItem link="/logout">Logout</NavItem>
    )}
  </ul>
);

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(navItems);
