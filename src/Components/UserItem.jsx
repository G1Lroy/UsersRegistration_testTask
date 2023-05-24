import React from "react";

const UserItem = ({ user }) => {
  return (
    <ul key={user.registration_timestam} className="user-item">
      <li>{user.name}</li>
      <li>
        <img src={user.photo} alt={user.name} />
      </li>
      <li>{user.email}</li>
      <li>{user.phone}</li>
      <li>{user.position}</li>
    </ul>
  );
};

export default UserItem;
