import React from "react";

import styles from "./Order.module.css";

const order = props => {
<<<<<<< HEAD
  console.log(props);
=======
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          margin: "0 4px",
          padding: "4px",
          borderRadius: "5px",
          backgroundColor: "#cccc"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

>>>>>>> temp
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
<<<<<<< HEAD
        Price: <strong>USD {props.price}</strong>
=======
        Price: <strong>USD {props.price.toFixed(2)}</strong>
>>>>>>> temp
      </p>
    </div>
  );
};

export default order;
