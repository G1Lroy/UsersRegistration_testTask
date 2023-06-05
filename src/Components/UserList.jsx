import React from "react";
import UserItem from "./UserItem";
import CommonButton from "./UI/buttons/CommonButton";
import "./UserList.css";
import Loader from "./UI/loader/Loader";
import { loadMoreData } from "./../utils/loadMoreData";
import { useRef } from "react";
import { scrollToEllement } from "../utils/scrollToElement";
import { Tooltip } from "react-tooltip";

const UserList = ({
  usersRef,
  userList,
  pagination,
  resetUserList,
  isUsersDataLoad,
  setUsersURL,
}) => {
  const ellementRef = useRef();

  if (isUsersDataLoad) {
    return <Loader></Loader>;
  }
  return (
    <>
      <div className="cards-wrapper">
        {userList.map((user) => (
          <UserItem user={user} />
        ))}
        <Tooltip id="my-tooltip" offset={20} noArrow={true} place="bottom" />
      </div>
      <div ref={ellementRef} className="user-list-buttons">
        <CommonButton
          disabled={!pagination.next}
          onClick={() => {
            loadMoreData(setUsersURL, pagination.next);
            scrollToEllement(ellementRef);
          }}
        >
          Show more
        </CommonButton>
        <CommonButton
          hidden={!pagination.prev}
          onClick={() => {
            resetUserList();
            scrollToEllement(usersRef);
          }}
        >
          Refresh
        </CommonButton>
      </div>
    </>
  );
};

export default UserList;
