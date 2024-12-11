import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartProducts,
  removeItem,
  updateQuantity,
} from "@/features/cartSlice";
import Counter from "./Counter";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.cartSlice);

  // Fetch cart products on mount
  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  // Calculate total price and total items
  const totalItems = products.map((item) => item.id)?.length;
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

  const onCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="py-4 flex flex-col justify-between h-screen pb-10">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-around items-center space-x-2">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            <div className="font-semibold flex items-center space-x-3">
              <span className="text-xl">Cart</span>

              <div className="h-7 w-7 bg-black text-center rounded-full text-background flex items-center justify-center">
                {totalItems}
              </div>
            </div>
          )}
        </div>
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && products.length === 0 && (
          <div className="flex items-center justify-center h-40">
            <p>Your cart is empty.</p>
          </div>
        )}
        {status === "succeeded" && products.length > 0 && (
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto  px-3">
            {products.map((item) => {
              const discountedPrice =
                item.price - (item.price * item.discountPercent) / 100;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <div className="flex items-center gap-4">
                    <div className="sm:w-20 sm:h-20 w-16 h-16">
                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/100x100/cccccc/FFFFFF?text=image"
                        }
                        alt={item.name}
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium sm:text-sm text-xs">
                        {item.name}}
                      </h3>
                      <p className="text-xs  text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-xs">
                        Price:{" "}
                        <span className="line-through text-muted-foreground text-xs">
                          ₹{item.price.toFixed(2)}
                        </span>{" "}
                        <span className="text-primary font-semibold">
                          ₹{discountedPrice.toFixed(2)}
                        </span>
                        <span className="font-bold bg-primary text-white text-xs px-1 ml-2 rounded">
                          Save {item.discountPercent}%
                        </span>
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
      <div className="mt-6 border-t pt-4 space-y-3 px-6">
        <div className="flex justify-between text-lg font-semibold">
          <span className="font-bold tracking-wider">Total</span>
          <span className="font-bold tracking-wider text-xl">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
        <Button
          // variant="outline"
          className="w-full "
          disabled={products.length === 0}
          onClick={onCheckout}
        >
          <p className="hover:translate-x-2 transition-all">CHECKOUT {">"}</p>
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
