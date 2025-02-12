/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Resatpassword() {
  const [isLoding, setIsLoding] = useState(false);
  const naviegate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email(),
    newPassword: Yup.string()
      .required("password is requierd")
      .matches(/^[A-Z]\w{4,10}$/, "Invalid password format ex:(M12584)"),
  });

  async function newPassword({ email, newPassword }) {
    try {
      setIsLoding(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );
      console.log(data);
      toast.success("updated password success");
      setIsLoding(false);
      naviegate("/login");
    } catch (error) {
      console.log(error);
      setIsLoding(false);
      toast.error('error in email or password');
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: newPassword,
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-ligth">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-center text-2xl font-semibold text-main mb-6">
            Resat Password
          </h2>
          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-main focus:outline-none"
              placeholder="Enter your Verify Code"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-main focus:outline-none"
              placeholder="Enter your new Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
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
        </form>
      </div>
    </>
  );
}
