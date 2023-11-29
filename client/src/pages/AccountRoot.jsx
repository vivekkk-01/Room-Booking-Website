import React from "react";
import { redirect, Outlet } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";

const AccountRoot = () => {
  return (
    <div>
      <AccountNavigation />
      <Outlet />
    </div>
  );
};

export default AccountRoot;

export const loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return redirect("/login");
  }
  return null;
};
