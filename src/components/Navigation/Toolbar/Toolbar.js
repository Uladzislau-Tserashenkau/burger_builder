import React from "react";
import "./Toolbar.scss";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
  return (
    <header className={"toolbar"}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={"toolbar__logo"}>
        <Logo />
      </div>
      <nav className={"toolbar__nav"}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default toolbar;
