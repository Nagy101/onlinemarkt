/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z]\w{4,10}$/, "Invalid password"),
  });

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      toast.success("Welcome Back ❤️");
      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-12 py-7 mb-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Login
      </h2>
      {apiError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">
          {apiError}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-center mt-4">
          <Link to="/forgotpassword" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
