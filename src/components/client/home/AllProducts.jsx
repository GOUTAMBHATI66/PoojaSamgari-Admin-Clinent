import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchallproductsSlice } from "@/features/allproductsSlice";
import ProductModal from "../OneProductDetailSheet/ProductModal";
import OneProductDetailSheet from "../OneProductDetailSheet/OneProductDetailSheet";
import { Skeleton } from "@/components/ui/skeleton";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.allproductsSlice
  );

  useEffect(() => {
    dispatch(fetchallproductsSlice());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="py-16 px-4 md:px-8 container">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-12">
        Sacred Essentials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        {!loading &&
          data?.data?.map((item, index) => {
            const discountedPrice = (
              item.price -
              (item.price * item.discountPercent) / 100
            ).toFixed(2);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-sm border overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-72 w-72">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover bg-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-amber-700 ">
                    {item.name}
                  </h3>
                  <p className="text-sm line-clamp-2 font-semibold text-amber-800/50 mb-2">
                    These products are evident in every offering. Truly a
                    blessing for any devotee...
                  </p>
                  <div className="flex items-center justify-start space-x-4">
                    <p className="text-sm font-semibold text-amber-700">
                      MRP: ₹{" "}
                      <span className="line-through text-amber-800/50">
                        {item.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm font-bold text-primary tracking-wider">
                      ₹{discountedPrice}
                    </p>
                    <span className="bg-primary text-white text-[10px] px-1 py-[1px] ml-2 font-semibold">
                      Save {item.discountPercent}%
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <OneProductDetailSheet slug={item.slug} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

export default AllProducts;
