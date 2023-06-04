import React from "react";
import "./UserItem.css";

const UserItem = ({ user }) => {
  return (
    <ul key={user.registration_timestam} className="user-item">
      <li className="user-avatar">
        <img className="user-image" src={user.photo} alt={user.name} />
      </li>
      <li className="user-name">{user.name}</li>
      <li className="user-position">{user.position}</li>
      <li className="user-email">{user.email}</li>
      <li className="user-phone">{user.phone}</li>
    </ul>
  );
};

export default UserItem;
