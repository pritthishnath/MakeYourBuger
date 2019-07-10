import React from 'react';

import Logo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo} style={{ backgroundColor: props.bgc }}>
        <img src={Logo} alt="MyBurger" />
    </div>
)

export default logo;