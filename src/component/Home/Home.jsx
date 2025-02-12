/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import style from "./Home.module.css";
import { UserContext } from "../../Context/UserContext";
import RecentProducts from "../../RecentProducts/RecentProducts";
import Loding from "../Loding/Loding";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriseSlider from "../CategoriseSlider/CategoriseSlider";
export default function Home() {
  return (
    <>
      <HomeSlider />
      <CategoriseSlider />
      <RecentProducts />
    </>
  );
}
