/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { FavContext } from "../../Context/FavContext";
import { Link } from "react-router-dom";
import { CartContaxt } from "../../Context/CartContext";

export default function FavProduct() {
  let { favProduct, deletedProduct } = useContext(FavContext);
  let { addProductToCart } = useContext(CartContaxt);

  return (
    <div className="flex justify-center flex-wrap gap-6 p-6 mt-4 ">
      {favProduct && favProduct.length > 0 ? (
        favProduct.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-56 object-contain"
                src={item.imageCover}
                alt={item.title}
              />
              <div className="p-5 text-center">
                <h5 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h5>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <button
                  onClick={() => addProductToCart(item.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => deletedProduct(item.id)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg mt-2 hover:bg-red-800 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">No favorite products found.</p>
      )}
    </div>
  );
}
