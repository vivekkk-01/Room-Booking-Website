import React from "react";
import { redirect, useNavigate } from "react-router-dom";

const Account = () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    navigate("/");
  };
  return (
    <div className="w-96 mx-auto text-center mt-7">
      <span className="block text-lg">
        Logged in as {`${userObj.name} (${userObj.email})`}
      </span>
      <button
        onClick={logoutHandler}
        className="py-2 rounded-full w-full mt-2 bg-primary text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
