/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRout({ children }) {
  if (localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }

}
