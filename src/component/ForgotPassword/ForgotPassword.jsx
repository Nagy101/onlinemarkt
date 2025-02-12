/* eslint-disable no-unused-vars */
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loding from "../Loding/Loding";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  async function forgotPassword(values) {
    try {
      setIsLoding(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success(data.message);
      setIsLoding(false);
      navigate("/verifycode");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoding(false);
    }
  }

  let formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: forgotPassword,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-ligth">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-semibold text-main mb-6">
          Forgot Password
        </h2>
        <div className="relative mb-4">
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-main focus:outline-none"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-main text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={isLoding}
        >
          {isLoding ? (
            <span className="flex items-center justify-center">
              <i className="fa-solid fa-spinner fa-spin mr-2"></i> Sending...
            </span>
          ) : (
            "Submit"
          )}
        </button>
        <Toaster position="top-center" />
      </form>
    </div>
  );
}
