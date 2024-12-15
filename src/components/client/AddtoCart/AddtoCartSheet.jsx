import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartPage from "./CartPage";

import { LuShoppingCart } from "react-icons/lu";

const AddtoCartSheet = () => {

  const [isOpen, setIsOpen] = useState(false);

  function handleSheetControl () {
    setIsOpen(false)
  }

  return (
    <div className="relative flex items-center space-x-3">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <LuShoppingCart
            size={23}
            className="text-orange-600 hover:text-orange-500 cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="right" className="xl:min-w-[50%] md:min-w-[80%] p-0">
          <CartPage onSheetControl={handleSheetControl} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddtoCartSheet;
