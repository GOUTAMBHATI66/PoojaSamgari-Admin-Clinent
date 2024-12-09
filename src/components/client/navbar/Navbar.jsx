import React from "react";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
const Navbar = () => {
  return (
    <nav className="bg-white/90 sticky top-0 ">
      <div className="h-14 flex items-center justify-between container">
        <div className="text-xl font-bold font-serif text-primary">|| SWASTIK ||</div>
        <div className="flex items-center justify-center gap-x-4">
          <FiUser size={23} className="text-primary hover:text-primary-foreground  cursor-pointer" />
          <LuShoppingCart size={23} className="text-primary hover:text-primary-foreground cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
