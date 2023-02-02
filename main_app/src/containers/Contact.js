import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";
import webcon from '../styles/ICON.png'

const HomePage = () => {
  return (
    <div className="home">
      <div className="Contact">
      <h1>Contact Us</h1>
      <ul>
        <a href="mailto:pkd560010@gmail.com"></a>
        <a href="tel:9663294606"></a>

      </ul>
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
