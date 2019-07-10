import React, { useState } from 'react';

import Aux from "../../hoc/Auxiliary";
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

const Layout = props => {

    const[state, setState] = useState({
        showSideDrawer: false
    })

    const sideDrawerHandler = () => {
        const doesShow = state.showSideDrawer;
        setState(prev => ({...prev, showSideDrawer: !doesShow}))
    }

    return (
      <Aux>
        <Toolbar sideDrawerOpen={sideDrawerHandler}/>
        <SideDrawer show={state.showSideDrawer} closed={sideDrawerHandler} />
        <main className={styles.Content}>{props.children}</main>
      </Aux>
    );
}

export default Layout;