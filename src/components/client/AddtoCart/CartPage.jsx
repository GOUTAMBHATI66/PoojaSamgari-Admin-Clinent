import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartProducts,
  removeItem,
  updateQuantity,
} from "@/features/cartSlice";
import Counter from "./Counter";
import ShippingAddress from "../Checkout/ShippingAddress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BsCartX } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartPage = ({onSheetControl}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  // Calculate total price and total items
  const totalItems = products.length;
  const totalPrice = products.reduce((total, item) => {
    const discountedPrice =
      item.price - (item.price * item.discountPercent) / 100;
    return total + discountedPrice * item.quantity;
  }, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="py-4 flex flex-col justify-between h-screen  pb-10">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-around items-center pb-2 space-x-2 border-b mx-4 border-black/50">
          {status === "loading" ? (
            <Skeleton className=" w-14 h-5 " />
          ) : (
            <div className="font-semibold flex items-center space-x-3">
              <span className="text-xl">Cart</span>
              <div className="h-7 w-7 bg-black text-center rounded-full text-background flex items-center justify-center">
                {totalItems}
              </div>
            </div>
          )}
        </div>
        {products?.length === 0 && (
          <div className="flex flex-col items-center py-5 ">
            <BsCartX size={80} color="gray" />
            <p className=" text-black text-xl font-bold mt-4 ">Hey, It feel so light!.</p>
            <p className=" text-sm mb-6 ">There is nothing in your cart, Let's add some items.</p>
            
            <Button onClick={ onSheetControl }>Return To Shop</Button>
            
          </div>
        )}
        {status !== "loading" &&
          status === "succeeded" &&
          products.length > 0 && (
            <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto px-3">
              {products.map((item) => {
                const discountedPrice =
                  item.price - (item.price * item.discountPercent) / 100;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="sm:w-20 sm:h-20 w-16 h-16">
                        <img
                          src={
                            item.imageUrl ||
                            "https://via.placeholder.com/100x100/cccccc/FFFFFF?text=Image"
                          }
                          alt={item.name}
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium sm:text-base text-sm">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                        <p className="text-xs space-x-2">
                          
                          {item.discountPercent >= 10 && item.discountPercent <= 70 ? 
                          
                          <span className="line-through text-muted-foreground text-xs">
                            ₹{item.price}
                          </span>
                          : ""}
                          <span className="text-primary text-base font-semibold">
                            ₹{discountedPrice}
                          </span>

                          {item.discountPercent >= 10 && item.discountPercent <= 70 ? 
                          
                          <Badge className=" text-[10px]  ml-2 font-semibold">
                            Save {item.discountPercent}%
                          </Badge>
                          : ""}
                          
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Counter
                        id={item.id}
                        initialQuantity={item.quantity}
                        handleQuantityChange={handleQuantityChange}
                      />
                      <button onClick={() => handleRemove(item.id)}>
                        <MdDeleteForever
                          size={25}
                          className="text-red-500 hover:text-red-600 transition-all hover:scale-110"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>

      {products?.length > 0 &&
      <div className="mt-6 border-t pt-4 space-y-3 px-6">
        <div className="flex justify-between text-lg font-semibold">
          <span className="font-bold tracking-wider">Total</span>
          <span className="font-bold tracking-wider text-xl">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        
        <ShippingAddress products={products} />
      </div>}
    </div>
  );
};

export default CartPage;
