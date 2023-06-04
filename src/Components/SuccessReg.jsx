import React from "react";
import successReg from "./../assets/success_image.svg";

const SuccessReg = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <h1 style={{textAlign: "center"}}>User successfully registered</h1>
      <img
        style={{ marginTop: "50px" }}
        src={successReg}
        alt="Registration success"
      />
    </div>
  );
};

export default SuccessReg;
