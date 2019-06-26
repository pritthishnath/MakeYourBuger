import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const control = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
]

const buildControls = props => (
    <div className={styles.BuildControls}>
        {control.map(ctrl => {
            return <BuildControl key={ctrl.label} label={ctrl.label} />;
        })}
    </div>
)

export default buildControls;