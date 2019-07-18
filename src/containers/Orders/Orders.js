import React from "react";

import Order from "../../components/Order/Order";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    console.log(this.props);
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
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let order = <p>error..</p>;
    if (this.state.orders) {
      order = this.state.orders.map(order => {
        return <Order key={order.id} price={order.price} />;
      });
    }

    return <div>{order}</div>;
  }
}

export default withErrorHandler(Orders, axios);
