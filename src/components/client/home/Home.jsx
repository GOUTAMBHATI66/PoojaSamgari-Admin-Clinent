import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Herosection from "./Herosection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Herosection/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
