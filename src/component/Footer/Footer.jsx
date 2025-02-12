/* eslint-disable no-unused-vars */
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-700 text-white py-8  ">
      <div className="container mx-auto px-4 text-center  ">
        {/* App Promotion */}
        <h2 className="text-2xl font-semibold">Get The FreshCart App</h2>
        <p className="text-gray-300 mt-2">
          We will send you a link. Open it on your phone to download the app.
        </p>

        {/* Email Subscription */}
        <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3">
          <div className="relative w-full sm:w-1/2">
            <i className="fas fa-envelope absolute left-3 top-4 text-gray-400"></i>
            <input
              type="email"
              className="w-full p-3 pl-10 border border-gray-500 rounded-lg focus:ring-blue-400 focus:border-blue-400 text-black"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">
            <i className="fas fa-paper-plane"></i> Send Email
          </button>
        </div>

        {/* App Download Links */}
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#"
            className="bg-gray-800 hover:bg-gray-900 px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <i className="fab fa-google-play"></i> Google Play
          </a>
          <a
            href="#"
            className="bg-gray-800 hover:bg-gray-900 px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <i className="fab fa-apple"></i> App Store
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-gray-400 flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-white">
            <i className="fas fa-shield-alt"></i> Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            <i className="fas fa-file-contract"></i> Terms & Conditions
          </a>
          <a href="#" className="hover:text-white">
            <i className="fas fa-phone"></i> Contact Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center gap-6 text-xl">
          <a href="#" className="hover:text-blue-500">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-red-600">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#" className="hover:text-pink-500">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-gray-400">
          © 2024 FreshCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
