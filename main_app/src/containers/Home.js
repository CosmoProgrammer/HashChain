import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";
import webcon from '../styles/ICON.png'

const HomePage = () => {
  return (
    <div className="home">
    <div>
      <div className="actions">
          <Link to="/qr" className="search-button">
            Scan QR Code
          </Link>
          <Link to="/search" className="search-button">
            Search by ID
          </Link>
      </div>
      <History />
    </div>
        <p className="description">
          Powered by blockchain technology for end-to-end transparency and
          security
        </p>

</div>

  );
};

export default HomePage;
