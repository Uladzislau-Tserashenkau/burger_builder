import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const allOrders = Object.entries(res.data).reduce((res, order) => {
          order[1]["id"] = order[0];
          res.push(order[1]);
          return res;
        }, []);
        this.setState({ loading: false, orders: allOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </div>
    );
  }
}
export default withErrorHandler(Orders, axios);
