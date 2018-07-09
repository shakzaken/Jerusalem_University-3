import React from "react";
import "./button_admin.css";

export default (props) => {
  return (
    <input
      type="submit"
      value={props.value}
      className="admin-button"
    />
  );
};
