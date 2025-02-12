/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const FavContext = createContext();

export default function FavContextProvider({ children }) {
  const [favProduct, setFavProduct] = useState([]);
  const [favCount, setFavCount] = useState();
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addFavProduct(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      getFavProduct();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product to favorites");
    }
  }

  async function getFavProduct() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setFavProduct(data.data);
      setFavCount(data.count);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch favorite products");
    }
  }

  async function deletedProduct(productId) {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers,
      }
    );
    getFavProduct();
    toast.success(data.message);
  }
  useEffect(() => {
    getFavProduct();
  }, []);

  return (
    <FavContext.Provider
      value={{
        favProduct,
        setFavProduct,
        addFavProduct,
        favCount,
        deletedProduct,
      }}
    >
      {children}
    </FavContext.Provider>
  );
}
