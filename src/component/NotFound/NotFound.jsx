/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Custom CSS file for styles

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">
          Oops! The page you are looking for does not exist.
          <i className="fas fa-exclamation-triangle not-found-icon"></i>
        </p>

        <Link to="/" className="not-found-button ">
          <i className="fas fa-home ml-3"></i> Go Back Home
        </Link>
      </div>
    </div>
  );
}
