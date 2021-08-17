import React from "react";
import "./button.scss";
const Button = (props) => {
  return (
    <button
      type={props.type}
      className={props.className === "primary" ? "primary" : "secondary"}
      onClick={props?.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
