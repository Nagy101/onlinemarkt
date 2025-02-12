/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Loding from "../Loding/Loding";
import { CartContaxt } from "../../Context/CartContext";

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContaxt);
  let { id } = useParams();
  const [product, setproduct] = useState(null);
  const [loding, setLoding] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  async function getProducts(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    console.log(data.data);
    setproduct(data.data);
    setLoding(false);
  }
  useEffect(() => {
    getProducts(id);
  }, []);
  return (
    <>
      {loding ? (
        <Loding />
      ) : (
        <div className="flex p-8 items-center gap-5">
          <div className="w-1/5">
            <Slider {...settings}>
              <div>{<img src={product.imageCover} alt={product.title} />}</div>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-3/4 ps-5">
            <h2 className="">{product.title}</h2>
            <p className="text-gray-500 m-2 py-4">{product.description}</p>
            <h3 className="">{product.category.name}</h3>
            <div className="flex justify-between">
              <h4>{product.price} EGP</h4>
              <p>
                <i className="fa-solid fa-star rating-color" />
                {product.ratingsAverage}
              </p>
            </div>
            <button
              onClick={() => addProductToCart(product.id)}
              className="btn w-full py-2 my-3"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
