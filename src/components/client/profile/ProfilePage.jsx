import { lazy, Suspense, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { FaCubesStacked, FaLocationArrow } from "react-icons/fa6";
import useLogout from "@/hooks/useLogout";
import { Loader, LucideLogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderSkeleton } from "@/components/shared/OrderSkeleton";

const ProfilePage = () => {
  const UserForm = lazy(() => import("../profile/UserForm"));
  const MyOrders = lazy(() => import("../profile/MyOrders"));

  const { authUser } = useAuth();
  const { isPending, handleLogout } = useLogout();

  const [showMyOrders, setShowMyOrders] = useState(true);
  const [showShippingAdd, setShowShippingAdd] = useState(false);

  const handleModalSwitch = (type) => {
    setShowMyOrders(type === "orders");
    setShowShippingAdd(type === "address");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-4 py-6 px-4 container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" h-auto lg:h-[500px] flex flex-col justify-between gap-3 p-4 border-secondary border-2   lg:sticky  top-20  rounded-xl"
        >
          <div className="flex flex-col gap-4">
            <h2 className=" text-xl text-slate-700 font-semibold mb-2 pb-2 border-b   border-double">
              Your Activity
            </h2>

            <Button
              size="custome"
              variant="secondary"
              className="flex gap-2 justify-start px-4   items-center border border-black/10 rounded-md relative overflow-hidden group"
              onClick={() => {
                setShowMyOrders(true);
                setShowShippingAdd(false);
              }}
            >
              <FaCubesStacked size={20} />
              <div className="flex flex-col items-start z-10">
                <p className="text-base font-medium text-start">My Order</p>
                <p className="text-xs min-[350px]:text-sm text-gray-600 text-start">
                  Check your order status
                </p>
              </div>

              {/* Hover Animation */}
              <span className="absolute inset-0 bg-[#cbb0a8ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
            </Button>

            <Button
              size="custome"
              variant="secondary"
              className="flex gap-2 justify-start px-4 items-center border border-black/10 rounded-md relative overflow-hidden group"
              onClick={() => {
                setShowShippingAdd(true);
                setShowMyOrders(false);
              }}
            >
              <FaLocationArrow size={20} />
              <div className="flex flex-col items-start z-10">
                <p className="text-base font-medium text-start">
                  Shipping Address
                </p>
                <p className="text-xs min-[350px]:text-sm text-gray-600 text-start text-wrap ">
                  Enter address for effortless checkout
                </p>
              </div>

              {/* Hover Animation */}
              <span className="absolute inset-0 bg-[#cbb0a8ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
            </Button>
          </div>

          <Button variant="secondary" onClick={handleLogout}>
            {isPending ? (
              <Loader className="animate-spin" size={15} />
            ) : (
              <LucideLogOut size={16} />
            )}{" "}
            <span>Logout</span>
          </Button>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {showShippingAdd && (
            <Suspense
              fallback={[...Array(6)].map((_, idx) => (
                <Skeleton key={idx} className="h-10 my-4  rounded-lg w-full" />
              ))}
            >
              <UserForm />
            </Suspense>
          )}
          {showMyOrders && (
            <Suspense fallback={OrderSkeleton}>
              <MyOrders />
            </Suspense>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
