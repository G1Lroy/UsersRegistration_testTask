import React from "react";
import UserItem from "./UserItem";

const UserList = ({ userList, pagination, loadMoreUsers, resetUserList }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userList.map((user) => (
        <UserItem user={user} />
      ))}

      <button disabled={!pagination.next} onClick={loadMoreUsers}>
        Show more
      </button>
      <button hidden={!pagination.prev} onClick={resetUserList}>
        Refresh
      </button>
    </div>
  );
};

export default UserList;
