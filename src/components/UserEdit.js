import React from "react";
import User from "./User";
import { useLocation } from "react-router-dom";

const UserEdit = () => {
  const { state } = useLocation();
  console.log("state", state);
  return <User isEdit={true} data={state} />;
};

export default UserEdit;
