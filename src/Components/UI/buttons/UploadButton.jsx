import React from "react";
import "./UploadButton.css";

const UploadButton = (props) => {
  return (
    <button className={props.className} {...props}>
      {props.children}
    </button>
  );
};

export default UploadButton;
