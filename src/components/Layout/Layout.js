import React from "react";
import Aux from "../../hoc/ax";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Aux>
      <div className={classes.top_content}>Toolbar, Side, Backdrop</div>
      <main>{props.children}</main>
    </Aux>
  );
};

export default Layout;
