import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home">
      <div className="Aboutinfo">
      <h1>About Us</h1>
      <p>Supply Chain
      </p>
      </div>
      <div>
        <p className="description">
          Powered by blockchain technology for end-to-end transparency and
          security
        </p>
      </div>
    </div>
  );
};

export default HomePage;
