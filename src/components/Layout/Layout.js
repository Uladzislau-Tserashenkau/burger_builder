import React from "react";
import Aux from "../../hoc/ax";

const Layout = (props) => {
  return (
    <Aux>
      <div>Toolbar</div>
      <main>{props.children}</main>
    </Aux>
  );
};

export default Layout;
