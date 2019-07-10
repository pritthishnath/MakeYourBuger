import React from 'react';

import Logo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const logo = () => (
    <div className={styles.Logo}>
        <img src={Logo} alt="MyBurger" />
    </div>
)

export default logo;