/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    } catch (err) {
      setApiError(err.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters")
      .max(15, "Maximum 15 characters"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z]\w{4,10}$/, "Invalid password format ex:(M12365)"),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        {apiError && (
          <div className="text-red-500 text-sm mb-4">{apiError}</div>
        )}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Confirm Password", name: "rePassword", type: "password" },
          { label: "Phone", name: "phone", type: "tel" },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={`Enter Your ${name} `}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors[name] && formik.touched[name] && (
              <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <span className="animate-spin">🔄</span> : "Register"}
        </button>
      </form>
    </div>
  );
}
