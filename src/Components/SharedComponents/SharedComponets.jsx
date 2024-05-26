import React from "react";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";

const SharedComponents = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default SharedComponents;
