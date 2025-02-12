/* eslint-disable no-unused-vars */
import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="container py-3 mt-10">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
