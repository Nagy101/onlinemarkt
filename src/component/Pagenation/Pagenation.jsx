/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function Pagenation({
  totalPosts,
  postsPerPages,
  setCurrentPage,
  currentPage,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPages); i++) {
    pages.push(i);
  }
  // const [loding, setLoding] = useState(true);
  return (
    <div className="flex justify-center mt-6">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentPage(page);
          }}
          className={`px-3 py-1 mx-1 border rounded ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
