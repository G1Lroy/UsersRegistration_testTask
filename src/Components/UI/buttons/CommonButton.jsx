import React from "react";
import "./CommonButton.css";

const CommonButton = ({ errors, ...props }) => {
  const className = errors ? "common-button--disable" : "common-button";
  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};

export default CommonButton;
