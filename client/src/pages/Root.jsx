import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import CircularProgressBar from "../components/CircularProgressBar";
import Header from "../components/Header";

const Root = () => {
  const navigation = useNavigation();
  return (
    <div className="p-4">
      <Header />
      {navigation.state === "loading" && (
        /*      <CircularProgress
          color="secondary"
          size="60px"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
        /> */
        <CircularProgressBar />
      )}
      {navigation.state !== "loading" && <Outlet />}
    </div>
  );
};

export default Root;
