import React from "react";
import "./DrawerToggle.scss";
import PropTypes from "prop-types";

const DrawerToggle = (props) => {
  return (
    <div onClick={props.clicked} className={"drawer-toggle"}>
      <div className={"drawer-toggle__stick"}></div>
      <div className={"drawer-toggle__stick"}></div>
      <div className={"drawer-toggle__stick"}></div>
    </div>
  );
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
