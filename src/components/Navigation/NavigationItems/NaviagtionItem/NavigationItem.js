import React from "react";
import "./NavigationItem.scss";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => (
  <li className={"navigation-item"}>
    <NavLink
      className={"navigation-item__link"}
      to={props.link}
      activeClassName={"navigation-item__link--active"}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
