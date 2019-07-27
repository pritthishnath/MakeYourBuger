import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Auxiliary/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Sidedrawer/SideDrawer";

const Layout = props => {
  const [state, setState] = useState({
    showSideDrawer: false
  });

  const sideDrawerHandler = () => {
    const doesShow = state.showSideDrawer;
    setState(prev => ({ ...prev, showSideDrawer: !doesShow }));
  };

  return (
    <Aux>
      <Toolbar sideDrawerOpen={sideDrawerHandler} isAuth={props.isAuth} />
      <SideDrawer
        show={state.showSideDrawer}
        closed={sideDrawerHandler}
        isAuth={props.isAuth}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
