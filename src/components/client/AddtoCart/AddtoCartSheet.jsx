import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartPage from "./CartPage";

import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

const AddtoCartSheet = () => {
  const { products, status, error } = useSelector((state) => state.cartSlice);

  return (
    <div className="relative flex items-center space-x-3">
      <Sheet>
        <SheetTrigger className="relative ">
          <LuShoppingCart
            size={23}
            className="text-orange-600 hover:text-orange-500 cursor-pointer"
          />
          {status === "loading" ? (
            <Skeleton className="w-5 h-5 rounded-full" />
          ) : (
            products.length > 0 && (
              <span className="rounded-full  font-bold flex items-center  justify-center uppercase my-auto p-1 absolute top-[-13px] right-[-10px] bg-muted-foreground text-white text-xs  w-5 h-5">
                {products.length}
              </span>
            )
          )}
        </SheetTrigger>
        <SheetContent className="xl:min-w-[50%] md:min-w-[80%]">
          <CartPage />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddtoCartSheet;
