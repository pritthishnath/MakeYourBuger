import React from "react";

import styles from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const burger = props => {
  let ingredientsArray = Object.keys(props.ingredients)
    .map(igKey => {
      // console.log("upper map: "+props.ingredients[igKey]);
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // console.log(props.ingredients[igKey]);
        // console.log(igKey+i);
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      // console.log(arr.concat(el));
      return arr.concat(el);
    }, []);

  if (ingredientsArray.length === 0) {
    ingredientsArray = <p>Please add ingredients!</p>;
  }

  // console.log(ingredientsArray);
  return (
    <div className={styles.Burger}>
      <BurgerIngredients type="bread-top" />
      {ingredientsArray}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
