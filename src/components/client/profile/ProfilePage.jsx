import { lazy, Suspense, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { FaCubesStacked, FaLocationArrow } from "react-icons/fa6";
import useLogout from "@/hooks/useLogout";
import { Loader, LucideLogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderSkeleton } from "@/components/shared/OrderSkeleton";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const UserForm = lazy(() => import("../profile/UserForm"));
  const MyOrders = lazy(() => import("../profile/MyOrders"));

  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { isPending, handleLogout } = useLogout();

  const [showMyOrders, setShowMyOrders] = useState(true);
  const [showShippingAdd, setShowShippingAdd] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-4 py-6 px-4 container mx-auto border-t border-black/10 mt-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" h-[500px] flex flex-col justify-between gap-3 p-4 border-secondary border-2   lg:sticky  top-20  rounded-xl"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-3 pb-4 border-b border-double">
              <FaUserCircle size={28} />
              <p className="text-xl font-semibold">Hello, {authUser.name}</p>
            </div>
            <h2 className=" text-lg text-slate-700 font-semibold ">
              Your Activity
            </h2>

            {authUser?.isAdmin && (
              <Button
                size="custome"
                variant="secondary"
                className="flex gap-2 justify-start px-4 items-center border border-black/10 rounded-md relative overflow-hidden group"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                <RiAdminFill size={20} />
                <div className="flex flex-col items-start z-10">
                  <p className="text-base font-medium text-start">Admin</p>
                  <p className="text-xs min-[350px]:text-sm text-gray-600 text-start text-wrap ">
                    click to visit admin panel
                  </p>
                </div>

                {/* Hover Animation */}
                <span className="absolute inset-0 bg-[#cbb0a8ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
              </Button>
            )}

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

          <Button variant="ghost" onClick={handleLogout}>
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
          className="flex-1 max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar"
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
    </div>
  );
};

export default ProfilePage;
