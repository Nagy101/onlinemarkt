/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./component/Layout/Layout.jsx";
import Home from "./component/Home/Home.jsx";
import Brand from "./component/Brand/Brand.jsx";
import Cart from "./component/Cart/Cart.jsx";
import NotFound from "./component/NotFound/NotFound.jsx";
import Categories from "./component/Categories/Categories.jsx";
import Products from "./component/Products/Products.jsx";
import Register from "./component/Register/Register.jsx";
import Login from "./component/Login/Login.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ProtectedRout from "./component/ProtectedRout/ProtectedRout.jsx";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword.jsx";
import ProductDetails from "./component/ProductDetails/ProductDetails.jsx";
import CartContaxtProvider from "./Context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import CheckOut from "./component/CheckOut/CheckOut.jsx";
import AllOrder from "./component/AllOrder/AllOrder.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavProduct from "./component/FavProduct/FavProduct.jsx";
import FavContextProvider from "./Context/FavContext.jsx";
import Resatpassword from "./component/ResatPassword/Resatpassword.jsx";
import VerifyCode from "./component/VerifyCode/VerifyCode.jsx";

const routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: (
          <ProtectedRout>
            <Home />
          </ProtectedRout>
        ),
      },
      {
        path: "brand",
        element: (
          <ProtectedRout>
            <Brand />
          </ProtectedRout>
        ),
      },
      {
        path: "favproduct",
        element: (
          <ProtectedRout>
            <FavProduct />
          </ProtectedRout>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRout>
            <CheckOut />
          </ProtectedRout>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRout>
            <AllOrder />
          </ProtectedRout>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRout>
            <Cart />
          </ProtectedRout>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRout>
            <Categories />
          </ProtectedRout>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRout>
            <ProductDetails />
          </ProtectedRout>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRout>
            <Products />
          </ProtectedRout>
        ),
      },
      {
        path: "verifycode",
        element: <VerifyCode />,
      },
      {
        path: "resatpassword",
        element: <Resatpassword />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const query = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <FavContextProvider>
          <CartContaxtProvider>
            <UserContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster />
            </UserContextProvider>
          </CartContaxtProvider>
        </FavContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
