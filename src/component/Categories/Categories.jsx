/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loding from "../Loding/Loding";

export default function Categories() {
  const [category, setCategory] = useState([]);

  async function getCategories() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategory(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {category.length ? (
        <div className="container mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-main text-center mb-6">
            Our Categories
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Explore our different categories, each containing a variety of
            products.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.map((image, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={image.image}
                  className="w-full h-[250px] object-contain rounded-t-lg"
                  alt={image.name}
                />
                <h3 className="text-center py-4 text-lg font-semibold text-main">
                  {image.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loding />
      )}
    </>
  );
}
