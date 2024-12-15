import { fetchproductdetailSlice } from "@/features/productdetailSlice";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Counter from "./Counter";
import { FaShoppingCart } from "react-icons/fa";
import { addItem } from "@/features/cartSlice";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

const ProductModal = ({ slug, onAddToCart }) => {
  const [quantity, setquantity] = useState("");
  const dispatch = useDispatch();
  
  const { data, loading, error } = useSelector(
    (state) => state.productdetailSlice
  );
  useEffect(() => {
    dispatch(fetchproductdetailSlice(slug));
  }, []);

  const handleAddToCart = () => {
    dispatch(addItem({ id: data?.data?.id, quantity: quantity }));
    if (onAddToCart) onAddToCart();
    toast.success("Product Added Successfully");
  };

  const discountedPrice =
    data?.data?.price - (data?.data?.price * data?.data?.discountPercent) / 100;

  return (
    <div className="flex flex-col py-5 justify-between hide-scrollbar space-y-3">
      <div className="flex flex-col items-start justify-start space-y-3">
        <div className="w-full h-72 rounded-lg shadow-md">
          <img
            src={data?.data?.imageUrl}
            alt={data?.data?.name}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg font-semibold ">{data?.data?.name}</h2>
        <p className="text-sm text-muted-foreground">
          {data?.data?.description}
        </p>
        <div className="flex items-center justify-start space-x-4">

        {data?.data?.discountPercent >= 10 && data?.data?.discountPercent <= 70 ? 
        <p className="text-sm font-semibold text-amber-700 text-nowrap">
        ₹
        <span className="line-through text-amber-800/50">
          {data?.data?.price.toFixed(2)}
        </span>
      </p> 
      : null}

          
          <p className="font-bold text-primary tracking-wider">
            ₹{discountedPrice.toFixed(2)}
          </p>
          {data?.data?.discountPercent >= 10 && data?.data?.discountPercent <= 70 ? 
          <Badge className=" text-[10px]  ml-2 font-semibold text-nowrap">
            Save {data?.data?.discountPercent}%
          </Badge> 
          : null}
          
        </div>

        <div className="flex gap-x-4 items-center">
          <span className="text-lg font-semibold">Quantity:</span>
          <Counter setquantity={setquantity} limit={data?.data?.stock} />
        </div>
      </div>

      <div className="w-full">
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500  text-white px-4 py-2 rounded-sm text-sm font-semibold w-full flex items-center justify-center"
        >
          Add to Cart <FaShoppingCart className="w-4 h-4 ml-2" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProductModal;
