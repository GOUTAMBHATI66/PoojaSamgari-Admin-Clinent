import React from "react";
import {FaFacebook} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto text-center space-y-6">
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold tracking-widest font-serif ">|| SWASTIK ||</h1>
        </div>
        <div className="flex justify-center space-x-8 text-sm">
          <a href="#" className="hover:text-muted">
            Terms of Service
          </a>
          <a href="#" className="hover:text-muted">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-muted">
            Security
          </a>
        </div>

        <div className="flex justify-center space-x-6 text-xl">
          <a href="#" className="hover:text-muted">
          <RiTwitterXFill />
          </a>
          <a href="#" className="hover:text-muted">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-muted">
          <FaInstagram />
          </a>
        </div>


        {/* Footer Text */}
        <p className="text-sm text-gra-500">
          © 2024 Swastik All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
