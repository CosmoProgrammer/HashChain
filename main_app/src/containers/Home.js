import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="header">
        <h1 className="title">Supply Chain Management System</h1>
        <p className="description">
          Powered by blockchain technology for end-to-end transparency and
          security
        </p>
      </div>
      <div className="actions">
        <Link to="/qr" className="scan-button">
          Scan QR Code
        </Link>
        <Link to="/search" className="search-button">
          Search by ID
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
