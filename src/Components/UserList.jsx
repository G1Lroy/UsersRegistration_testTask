import React from "react";
import UserItem from "./UserItem";
import CommonButton from "./UI/buttons/CommonButton";
import "./UserList.css";

const UserList = ({ userList, pagination, loadMoreUsers, resetUserList }) => {
  return (
    <>
      <div className="cards-wrapper">
        {userList.map((user) => (
          <UserItem user={user} />
        ))}
      </div>
      <div className="user-list-buttons">
        <CommonButton disabled={!pagination.next} onClick={loadMoreUsers}>
          Show more
        </CommonButton>
        <CommonButton hidden={!pagination.prev} onClick={resetUserList}>
          Refresh
        </CommonButton>
      </div>
    </>
  );
};

export default UserList;
