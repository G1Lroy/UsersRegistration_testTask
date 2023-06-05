import React from "react";
import "./UserItem.css";
import { Tooltip } from "react-tooltip";

const UserItem = ({ user }) => {
  return (
    <>
      <ul key={user.registration_timestam} className="user-item">
        <li className="user-avatar">
          <img className="user-image" src={user.photo} alt={user.name} />
        </li>
        <li className="user-name">{user.name}</li>
        <li className="user-position">{user.position}</li>
        <li
          data-tooltip-id="my-tooltip"
          data-tooltip-content={user.email}
          className="user-email"
        >
          {user.email}
        </li>
        <li className="user-phone">{user.phone}</li>
      </ul>
    </>
  );
};

export default UserItem;
