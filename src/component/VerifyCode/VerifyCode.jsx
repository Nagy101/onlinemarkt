/* eslint-disable no-unused-vars */
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);

  const validationSchema = Yup.object().shape({
    verifyCode: Yup.string()
      .required("Code is required")
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit code"),
  });

  async function getVerifyCode({ verifyCode }) {
    try {
      setIsLoding(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: verifyCode }
      );
      toast.success(data.status);
      setIsLoding(false);
      navigate("/resatpassword");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoding(false);
      console.log(error);
    }
  }

  let formik = useFormik({
    initialValues: { verifyCode: "" },
    validationSchema,
    onSubmit: getVerifyCode,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-ligth">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-semibold text-main mb-6">
          Verify Code
        </h2>
        <div className="relative mb-4">
          <input
            type="tel"
            name="verifyCode"
            id="verifyCode"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-main focus:outline-none"
            placeholder="Enter your Verify Code"
            value={formik.values.verifyCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.verifyCode && formik.touched.verifyCode && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.verifyCode}
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
  );
}
