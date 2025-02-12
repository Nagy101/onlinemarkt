/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 1500,
  autoplay: true,
  arrows: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

export default function CategoriseSlider() {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="py-4 text-2xl font-bold text-center text-main  tracking-wide">
        Our Categories
      </h2>
      <div className="overflow-hidden rounded-xl shadow-lg">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="px-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="relative bg-white/10 backdrop-blur-lg rounded-xl shadow-md p-4 border border-white/20 hover:shadow-lg transition-shadow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>

                <motion.img
                  src={category.image}
                  className="w-full h-40 object-contain rounded-lg"
                  alt={category.name}
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                <h3 className="mt-3 text-center text-gray-800 font-semibold uppercase">
                  {category.name}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
