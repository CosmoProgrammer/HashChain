import React from "react";
import { Link } from "react-router-dom";
import History from "./History";
import "../styles/home.css";
import webcon from '../styles/ICON.png'

const HomePage = () => {
  return (
    <div className="home">
      <div className="Aboutinfo">
      <h1>About Project</h1>
      <p>Welcome to Hashchain - the innovative supply chain website created by a team of high school students.</p>
      <p>At Hashchain, we believe in the power of transparency and traceability in the world of supply chain. That is  why we have come together to create a platform which provides complete and accurate information about products, from the source of their ingredients to the final product on store shelves. </p>
      <p>Our team consists of dedicated high school students who share the vision of a more efficient and sustainable supply chain system. Through research, collaboration and a drive to succeed, we have developed Hashchain to provide an unprecedented level of detail about the products you purchase and use every day. 

</p><p>Our website provides a comprehensive overview of the entire supply chain for each product, including procurement, logistics, transportation, maintenance, and distribution. We also trace each ingredient back to its source and provide all necessary details, allowing you to make informed decisions about the products you buy. 

</p><p>We aim to demonstrate that transparency and traceability in the supply chain is an important aspect of a well functioning and responsible supply chain system that can bring many benefits, including improved ethical and sustainable practices, better supply chain efficiency, increased customer trust, improved risk management and cost savings. 

</p><p>We invite you to join us on this exciting journey to explore the world of supply chain like never before!
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
