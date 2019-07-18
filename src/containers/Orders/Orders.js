import React, { useState, useEffect } from "react";

import Order from "../../components/Order/Order";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = props => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        console.log(fetchedOrders);
        setOrders(fetchedOrders);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!loading ? (
        orders.map(order => {
          return (
            <Order
              key={order.id}
              price={+order.price}
              ingredients={order.ingredients}
            />
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
