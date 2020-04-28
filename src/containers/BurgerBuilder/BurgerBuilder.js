import React, { Component } from "react";
import Aux from "../../hoc/ax";
import Burger from "../../components/Burger/Burger";

export default class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build controls</div>
      </Aux>
    );
  }
}
