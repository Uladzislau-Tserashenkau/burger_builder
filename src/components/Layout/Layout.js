import React from "react";
import Aux from "../../hoc/ax";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <main className={classes.top_content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
