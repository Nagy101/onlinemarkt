/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loding from "../Loding/Loding";
import Pagenation from "../Pagenation/Pagenation";
import { FavContext } from "../../Context/FavContext";
import { CartContaxt } from "../../Context/CartContext";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPages = 8;
  const { addProductToCart } = useContext(CartContaxt);
  const { addFavProduct } = useContext(FavContext);
  const [searchInput, setSearchInput] = useState("");

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
  });

  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPages;
  const firstPostIndex = lastPostIndex - postsPerPages;
  const currentProducts = filteredProducts?.slice(
    firstPostIndex,
    lastPostIndex
  );

  return (
    <>
      {isLoading ? (
        <Loding />
      ) : (
        <div className="container mx-auto py-10 px-4">
          {/* Search Bar */}
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-8">
            <div className="relative">
              <input
                type="search"
                value={searchInput}
                className="block w-full p-3 pl-10 text-black border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for products..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fa-solid fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-1"
              >
                <Link to={`productdetails/${product.id}`} className="block">
                  <img
                    src={product.imageCover}
                    className="w-full h-[250px] object-contain rounded-lg bg-gray-100 p-4"
                    alt={product.title}
                  />
                  <h3 className="text-main text-sm font-semibold mt-2">
                    {product.category.name}
                  </h3>
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {product.title}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <h4 className="text-gray-700 font-semibold">
                      {product.price} EGP
                    </h4>
                    <p className="text-yellow-500 flex items-center">
                      <i className="fa-solid fa-star mr-1"></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>

                {/* Wishlist & Cart Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="bg-main text-white px-4 py-2 rounded-lg w-full hover:bg-[#2f4e82]"
                  >
                    Add to Cart
                  </button>
                  <i
                    onClick={() => addFavProduct(product.id)}
                    className="fa-regular fa-heart text-red-600 text-2xl cursor-pointer ml-3"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagenation
              totalPosts={filteredProducts?.length}
              postsPerPages={postsPerPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
}
