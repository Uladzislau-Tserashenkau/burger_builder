import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/ax";

const SideDrawer = (props) => {
  const attachedClasses = [
    "side-drawer",
    props.open ? "side-drawer_open" : "side-drawer_close",
  ];
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={"side-drawer__logo"}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
