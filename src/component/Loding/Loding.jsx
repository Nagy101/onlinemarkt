/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loding() {
  return (
    <>
      <div className="sweet-loading py-16">
        <HashLoader
          color={"#3f68ab"}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
