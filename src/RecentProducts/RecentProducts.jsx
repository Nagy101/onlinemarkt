/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loding from "../component/Loding/Loding";
import { useQuery } from "@tanstack/react-query";
import { CartContaxt } from "../Context/CartContext";
import { FavContext } from "../Context/FavContext";
import Pagenation from "../component/Pagenation/Pagenation";

export default function RecentProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPages] = useState(8);
  const { addProductToCart } = useContext(CartContaxt);
  const { addFavProduct } = useContext(FavContext);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
  });

  const lastPostIndex = currentPage * postsPerPages;
  const firstPostIndex = lastPostIndex - postsPerPages;
  const currentProduct = data?.data.data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {isLoading ? (
        <Loding />
      ) : (
        <>
          <div className="container mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold text-main text-center mb-8">
              Recent Products 
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProduct.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border p-3  border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
                >
                  <Link to={`productdetails/${product.id}`} className="block">
                    <img
                      src={product.imageCover}
                      className="w-full h-48 object-contain bg-gray-100 p-3 rounded-lg"
                      alt={product.title}
                    />
                  </Link>

                  <div className="p-4">
                    <h3 className="text-main text-sm font-medium">
                      {product.category.name}
                    </h3>
                    <h3 className="text-lg font-semibold truncate">
                      {product.title.split(" ", 2).join(" ")}
                    </h3>

                    <div className="flex justify-between items-center mt-2">
                      <h4 className="text-gray-700 font-bold">
                        {product.price} EGP
                      </h4>
                      <p className="text-yellow-500 flex items-center">
                        <i className="fa-solid fa-star mr-1" />
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </div>

                  {/* Favorite & Add to Cart */}
                  <div className="flex items-center justify-between px-4 pb-4">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="w-2/3 bg-main hover:bg-[#30508a] text-white py-2 rounded-lg transition"
                    >
                      Add To Cart
                    </button>

                    <div
                      onClick={() => addFavProduct(product.id)}
                      className="text-2xl text-red-500 cursor-pointer"
                    >
                      <i className="fa-regular fa-heart" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Pagenation
        totalPosts={data?.data.data.length}
        postsPerPages={postsPerPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
