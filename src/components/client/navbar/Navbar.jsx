import React from "react";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import AddtoCartSheet from "../AddtoCart/AddtoCartSheet";
const Navbar = () => {
  return (
    <nav className="bg-white/90 sticky top-0 z-50">
      <div className="h-14 flex items-center justify-between container">
        <div className="text-xl font-bold font-serif text-orange-600">
          || SWASTIK ||
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Link to="/profile">
            <FiUser
              size={23}
              className="text-orange-600 hover:text-orange-500  cursor-pointer"
            />
          </Link>
          <AddtoCartSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
