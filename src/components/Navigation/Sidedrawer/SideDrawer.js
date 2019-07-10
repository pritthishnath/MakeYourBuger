import React from "react";

import styles from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

const sideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close]
  if (props.show) {
    attachedClasses = [styles.SideDrawer, styles.Open]
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo bgc="transparent" />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
