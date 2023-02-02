import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";
import webcon from '../styles/ICON.png'

const HomePage = () => {
  return (
    <div className="main">
    <div className="home-page">
      <div className="header">
        <li>
        <ul className="title"><img src={webcon} style={{height:'110px'}}/>HashChain</ul>
        <ul className="subhead">Supply Chain Management System</ul></li>
        <div className="navbar">
          <ul>
            <li><a><Link to="/qr">
              About Us
            </Link></a></li>
            <li><a><Link to="/search">
              Contact Us
            </Link></a></li>
            <li><a><Link to="/search">
              About Project
            </Link></a></li>
          </ul>
        </div>
      </div>
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
    </div>
  );
};

export default HomePage;
