/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loding from "../Loding/Loding";
import Pagenation from "../Pagenation/Pagenation";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Keep it consistent

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = brands.slice(firstPostIndex, lastPostIndex);

  async function getBrand() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <>
      {Array.isArray(brands) && brands.length ? (
        <div className="container mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-main text-center mb-6">
            Our Brands
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Explore our brands, each offering a variety of high-quality
            products.
          </p>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentPost.map((brand, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={brand.image}
                  className="w-full h-[200px] object-contain rounded-t-lg bg-gray-100 p-6"
                  alt={brand.name}
                />
                <h3 className="text-center py-4 text-lg font-semibold text-main">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagenation
              totalPosts={brands.length}
              postsPerPages={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : (
        <Loding />
      )}
    </>
  );
}
