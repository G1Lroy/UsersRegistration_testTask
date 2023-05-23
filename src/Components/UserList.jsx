import React from "react";

const UserList = ({ userList, pagination, loadMoreUsers, resetUserList }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {userList.map((user) => (
          <ul key={user.registration_timestam}>
            <li>{user.name}</li>
            <li>
              <img src={user.photo}></img>
            </li>
            <li>{user.email}</li>
            <li>{user.phone}</li>
            <li>{user.position}</li>
          </ul>
        ))}
      </div>
      <button disabled={!pagination.next} onClick={loadMoreUsers}>
        Show more
      </button>
      <button disabled={!pagination.prev} onClick={resetUserList}>
        X
      </button>
    </div>
  );
};

export default UserList;
