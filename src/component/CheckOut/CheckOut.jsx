/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [loading, setLoading] = useState(false);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();
  async function checkOut(shippingAddress) {
    if (!cart?.cartId) {
      toast.error("Cart is empty!");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("User not authenticated!");
      return;
    }

    setLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://nagy101.github.io/onlinemarkt/`,
        { shippingAddress },
        {
          headers: { token },
        }
      );

      toast.success("Order Placed Successfully!");
      // window.location.href = data.session.url;
      console.log(data);
    } catch (error) {
      toast.error("Checkout Failed!");
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      city: "",
      address: "",
      phone: "",
    },
    onSubmit: (values) => checkOut(values),
  });

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">
        <i className="fas fa-shopping-cart"></i> Checkout
      </h2>

      <form onSubmit={formik.handleSubmit} className="checkout-form">
        <div className="input-group">
          <label htmlFor="city">
            <i className="fas fa-city"></i> City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="address">
            <i className="fas fa-map-marker-alt"></i> Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">
            <i className="fas fa-phone"></i> Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>

        <button type="submit" className="checkout-button" disabled={loading}>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : (
            <>
              <i className="fas fa-shopping-bag"></i> Place Order
            </>
          )}
        </button>
      </form>
    </div>
  );
}
