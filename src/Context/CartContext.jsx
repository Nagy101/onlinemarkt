/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export let CartContaxt = createContext();

export default function CartContaxtProvider({ children }) {
  const [cart, setCart] = useState("");
  const [numberOfCart, setNumberOfCart] = useState(0);
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      );
      // console.log(data);
      getCartProduct();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCartProduct() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );
      setCart(data);
      setNumberOfCart(data.numOfCartItems);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProduct(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );
      setCart(data);
      toast.success("item deleted");
    } catch (error) {
      console.log(error);
    }
  }
  async function updateProduct(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      );
      setCart(data);
      toast.success("success");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCartProduct();
  }, []);
  return (
    <CartContaxt.Provider
      value={{
        addProductToCart,
        cart,
        deleteProduct,
        updateProduct,
        numberOfCart,
      }}
    >
      {children}
    </CartContaxt.Provider>
  );
}
