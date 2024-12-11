import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductModal from "./ProductModal";
import { FaShoppingCart } from "react-icons/fa";


const OneProductDetailSheet = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {

    setIsOpen(false); 
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetTrigger
          className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500  text-white px-4 py-2 rounded-sm text-sm font-semibold w-full flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
        Add to Cart <FaShoppingCart className="w-4 h-4 ml-2" />
        </SheetTrigger>
        <SheetContent className="max-h-screen" side="left">
          <ProductModal slug={slug} onAddToCart={handleAddToCart} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OneProductDetailSheet;
