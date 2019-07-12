import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import DrawerToggle from './DrawerToggle/DrawerToggle';

const toolbar = props => (
  <Aux>
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.sideDrawerOpen} />
      <Logo />
      <nav className={styles.DesktopOnly}>
        <NavItems />
      </nav>
    </header>
  </Aux>
);

export default toolbar;