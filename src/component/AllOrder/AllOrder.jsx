/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loding from "../Loding/Loding";

export default function AllOrder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");
  const { id, name } = jwtDecode(token);

  async function getOrder() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {orders.length ? (
        <div className="container mx-auto p-6">
          <h2 className="text-center text-3xl font-bold text-main mb-6">
            🛍️ Hello, {name}! Your Orders
          </h2>

          {orders.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-xl p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-lg font-semibold text-main dark:text-white mb-3">
                    📦 Order #{index + 1}
                  </h3>
                  <div className="space-y-4">
                    {order.cartItems && order.cartItems.length > 0 ? (
                      order.cartItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-2 border-b border-gray-300 last:border-none"
                        >
                          {item.product?.imageCover ? (
                            <img
                              src={item.product.imageCover}
                              className="w-20 h-20 object-cover rounded-xl border border-gray-300"
                              alt="Product"
                            />
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                              No image available
                            </p>
                          )}
                          <div>
                            <h3 className="text-main dark:text-gray-300 font-medium">
                              💰 Price:{" "}
                              <span className="font-bold text-blue-500">
                                {item.price} EGP
                              </span>
                            </h3>
                            <h3 className="text-gray-600 dark:text-gray-400">
                              📦 Qty: {item.count}
                            </h3>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No items in cart
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-gray-700 dark:text-gray-300">
                    <h3 className="font-semibold">
                      💵 Total: {order.totalOrderPrice} EGP
                    </h3>
                    <h3 className="font-semibold">
                      💳 Payment: {order.paymentMethodType}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-5 text-lg">
              🚫 No orders found.
            </p>
          )}
        </div>
      ) : (
        <Loding />
      )}
    </>
  );
}
