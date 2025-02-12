/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { CartContaxt } from "../../Context/CartContext";
import Loding from "../Loding/Loding";
import { Link } from "react-router-dom";
import { FavContext } from "../../Context/FavContext";

export default function Cart() {
  let { cart, deleteProduct, updateProduct } = useContext(CartContaxt);
  let { addFavProduct } = useContext(FavContext);

  return (
    <>
      {cart ? (
        <section className="bg-[#f0f3f2] py-10">
          <div className="mx-auto max-w-screen-xl px-4">
            <h2 className="text-3xl font-semibold text-main mb-6">
              Shopping Cart
            </h2>

            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              {/* Products List */}
              <div className="w-full lg:w-3/4 space-y-6">
                {cart.data.products.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-5 shadow-md flex flex-col md:flex-row items-center justify-between"
                  >
                    <img
                      className="w-20 h-20 object-cover rounded-md"
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />

                    <div className="text-center md:text-left flex-1 mx-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.product.title}
                      </h3>
                      <p className="text-gray-600">{item.price} EGP</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          item.count === 1
                            ? deleteProduct(item.product.id)
                            : updateProduct(item.product.id, item.count - 1)
                        }
                        className="h-8 w-8 flex items-center justify-center rounded-md bg-[#f0f3f2] text-gray-900 hover:bg-[#d8e1e0] transition"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          updateProduct(item.product.id, item.count + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center rounded-md bg-[#f0f3f2] text-gray-900 hover:bg-[#d8e1e0] transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => addFavProduct(item.product.id)}
                        className=""
                      >
                        Add to Favorites
                      </button>
                      <button
                        onClick={() => deleteProduct(item.product.id)}
                        className="text-red-700 "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/4 p-5 bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-main mb-4">
                  Order Summary
                </h3>
                <div className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Price:</span>
                    <span className="font-semibold text-gray-900">
                      {cart.data.totalCartPrice} EGP
                    </span>
                  </div>
                </div>
                <Link to={"/checkout"}>
                  <button className="w-full mt-4   text-white py-2 rounded-lg ">
                    Proceed to Checkout
                  </button>
                </Link>
                <div className="text-center mt-4 text-gray-600">
                  or{" "}
                  <Link to={"/"} className="text-main  hover:text-blue-600">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loding />
      )}
    </>
  );
}
