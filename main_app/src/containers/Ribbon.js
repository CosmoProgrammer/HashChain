import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";
import webcon from '../styles/ICON.png'

const Ribbon = () => {
    return(
    <div className="main">
    <div className="about-page">
      <div className="header">
        <li>
        <ul className="title"><a><Link to='/Home'><img src={webcon} style={{height:'110px'}}/>HashChain</Link></a></ul>
        <ul className="subhead">"A mathematical framework that is free of politics and human error"</ul></li>
        <div className="navbar">
          <ul>
            <li><a><Link to="/about_us">
              About Us
            </Link></a></li>
            <li><a><Link to="/contact_us">
              Contact Us
            </Link></a></li>
            <li><a><Link to="/about_project">
              About Project
            </Link></a></li>
            <li><a><Link to="/">
              Login
            </Link></a></li>
          </ul>
        </div>
      </div>
      </div>
      </div>
    )
}

export default Ribbon