/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContaxt } from "../../Context/CartContext";
import { FavContext } from "../../Context/FavContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [showBtn, setShowBtn] = useState(false);
  const { userToken, setUserToken } = useContext(UserContext);
  let { numberOfCart } = useContext(CartContaxt);
  const { favCount } = useContext(FavContext);
  let navigate = useNavigate();

  function toggleMenu() {
    setShowBtn(!showBtn);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    toast.success(" Log Out 👋");
    navigate("/login");

  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md capitalize">
      <nav className="flex items-center justify-between px-6 py-3 md:px-12">
        <div className="flex">
          <Link to={"/"}>
            <div className="flex">
              <i className="fa-solid text-main fa-cart-shopping fa-2x" />
              <h3 className="font-semibold text-black text-2xl"> Fresh Cart</h3>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </button>
        </div>

        {userToken && (
          <div className="hidden lg:flex space-x-6 text-gray-600 font-medium">
            <NavLink to={"/"} className="hover:text-gray-900">
              Home
            </NavLink>
            <NavLink to={"/categories"} className="hover:text-gray-900">
              Categories
            </NavLink>
            <NavLink to={"/brand"} className="hover:text-gray-900">
              Brands
            </NavLink>
            <NavLink to={"/products"} className="hover:text-gray-900">
              Products
            </NavLink>
          </div>
        )}

        <div className="hidden lg:flex space-x-6 items-center">
          {userToken ? (
            <>
              <Link
                to={"/favproduct"}
                className="relative text-red-600 text-2xl"
              >
                <i className="fa-solid fa-heart hover:text-red-600"></i>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                  {favCount}
                </span>
              </Link>
              <NavLink to={"/cart"} className="relative text-xl text-gray-600">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 rounded-full">
                  {numberOfCart}
                </span>
              </NavLink>
              <NavLink
                to={"/allorders"}
                className="cursor-pointer font-semibold text-gray-900 hover:text-main"
              >
                All Order
              </NavLink>
              <span
                onClick={logOut}
                className="cursor-pointer font-semibold text-gray-900 hover:text-main"
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <NavLink
                to={"/register"}
                className="font-semibold hover:text-gray-900"
              >
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className="font-semibold text-gray-900 hover:text-gray-700"
              >
                Log in →
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {showBtn && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg py-6 px-4">
            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <NavLink
                to={"/"}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                Home
              </NavLink>
              <NavLink
                to={"/cart"}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                Cart
              </NavLink>
              <NavLink
                to={"/categories"}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                Categories
              </NavLink>
              <NavLink
                to={"/brand"}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                Brands
              </NavLink>
              <NavLink
                to={"/products"}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                Products
              </NavLink>
            </div>
            <div className="mt-6">
              <span
                onClick={logOut}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 hover:text-main rounded-lg cursor-pointer transition-all duration-300"
              >
                Log Out
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
