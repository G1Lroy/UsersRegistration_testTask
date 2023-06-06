import React from "react";
import CommonButton from "./UI/buttons/CommonButton";
import headerLogo from "./../assets/header-logo.svg";
import { scrollToEllement } from "./../utils/scrollToElement";
import "./HeaderContent.css";

const HeaderContent = ({ formRef, usersRef }) => {
  return (
    <>
      <menu className="header-menu">
        <div className="header-menu--wrapper">
          <div className="header-logo">
            <img src={headerLogo} alt="Test task" />
          </div>
          <nav className="navigation-block">
            <CommonButton onClick={() => scrollToEllement(usersRef)}>
              Users
            </CommonButton>
            <CommonButton onClick={() => scrollToEllement(formRef)}>
              Sign up
            </CommonButton>
          </nav>
        </div>
      </menu>

      <div className="header-info">
        <div className="header-text">
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
        </div>
        <CommonButton onClick={() => scrollToEllement(formRef)}>
          Sign up
        </CommonButton>
      </div>
    </>
  );
};

export default HeaderContent;
