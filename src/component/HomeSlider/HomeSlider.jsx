/* eslint-disable no-unused-vars */
import slid1 from "../../assets/images/slider-image-1.jpeg";
import slid2 from "../../assets/images/slider-image-2.jpeg";
import slid3 from "../../assets/images/slider-image-3.jpeg";
import banner from "../../assets/images/blog-img-1.jpeg";
import banner2 from "../../assets/images/blog-img-2.jpeg";
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          className="col-span-3 rounded-xl overflow-hidden shadow-lg bg-white/20 backdrop-blur-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Slider {...settings}>
            {[slid1, slid2, slid3].map((slide, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={slide}
                  className="w-full h-[400px] object-cover rounded-xl"
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </Slider>
        </motion.div>

        <div className="col-span-1 flex flex-col gap-4">
          {[banner, banner2].map((img, index) => (
            <motion.img
              key={index}
              src={img}
              className="w-full h-[195px] object-cover rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105"
              alt={`Banner ${index + 1}`}
              loading="lazy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
