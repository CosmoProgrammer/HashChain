import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";
import mailicon from "../styles/mail icon.png"


const HomePage = () => {
  return (
    <div className="home">
      <div className="Aboutinfo">
      <h1>Contact Us</h1>
      </div>
        <p className="description">
          Powered by blockchain technology for end-to-end transparency and
          security
        </p>
      </div>
  );
};

export default HomePage;
