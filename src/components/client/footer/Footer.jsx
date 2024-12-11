import React from "react";
import {FaFacebook} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" text-orange-600 py-8 bg-white">
      <div className="container mx-auto text-center space-y-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-widest font-serif ">|| SWASTIK ||</h1>
        </div>
        <div className="flex justify-center space-x-8 text-sm">
          <a href="#" className="hover:text-orange-500">
            Terms of Service
          </a>
          <a href="#" className="hover:text-orange-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-500">
            Security
          </a>
        </div>

        <div className="flex justify-center space-x-6 text-xl">
          <a href="#" className="hover:text-orange-500">
          <RiTwitterXFill />
          </a>
          <a href="#" className="hover:text-orange-500">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-orange-500">
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
