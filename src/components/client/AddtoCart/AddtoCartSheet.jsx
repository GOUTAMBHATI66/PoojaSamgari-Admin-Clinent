import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartPage from "./CartPage";

import { LuShoppingCart } from "react-icons/lu";

const AddtoCartSheet = () => {
  return (
    <div className="relative flex items-center space-x-3">
      <Sheet>
        <SheetTrigger>
          <LuShoppingCart
            size={23}
            className="text-orange-600 hover:text-orange-500 cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="xl:min-w-[50%] md:min-w-[80%] p-0">
          <CartPage />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddtoCartSheet;
