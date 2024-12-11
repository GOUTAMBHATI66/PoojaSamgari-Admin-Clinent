import React, { useContext, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Button } from "@/components/ui/button";
import MyOrders from "./MyOrders";
import UserForm from "./UserForm"; 
import { useAuth } from "@/components/context/AuthContext";
import { FaCubesStacked, FaLocationArrow } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";


const ProfilePage = () => {

  const { authUser } = useAuth();
  
  const [showMyOrders, setShowMyOrders] = useState(false)
  const [showShippingAdd, setShowShippingAdd] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row gap-3 py-5 px-2 md:px-8  ">
        {/* Sidebar */}
        <div className="h-[500px] border border-black/10 bg-[#E2D0CA] rounded-xl">
          <div className="flex h-[20%] items-start gap-5">
          
            {/* Name and Email */}
            <div className="flex h-full flex-col items-center justify-center py-8 md:py-4 bg-[#FFF9ED]  rounded-t-xl w-full gap-2">
              <p className="text-xl font-semibold">Hello, {authUser?.name}</p> 
              <p className="text-sm text-gray-600">{authUser?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="h-[80%] flex flex-col justify-between gap-3 p-4">

            <div className="flex flex-col gap-4">
            <h2 className=" text-xl text-slate-700 font-semibold mb-2 pb-2 border-b border-black/30">Your Activity</h2>

            <Button size="custome" variant="secondary" className="flex gap-2 justify-start px-4   items-center border border-black/10 rounded-md relative overflow-hidden group"
            onClick={() => {
              setShowMyOrders(true)
              setShowShippingAdd(false)
            }
            }>       
            <FaCubesStacked size={20} /> 
            <div className="flex flex-col items-start z-10">
              <p className="text-base font-medium text-start">My Order</p>
              <p className="text-xs min-[350px]:text-sm text-gray-600 text-start">Check your order status</p>
            </div>

            {/* Hover Animation */}
            <span className="absolute inset-0 bg-[#cbb0a8ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
            </Button>

            <Button size="custome" variant="secondary" className="flex gap-2 justify-start px-4 items-center border border-black/10 rounded-md relative overflow-hidden group"
            onClick={() => {
              setShowShippingAdd(true)
              setShowMyOrders(false)
            }
            }>       
            <FaLocationArrow size={20} /> 
            <div className="flex flex-col items-start z-10">
              <p className="text-base font-medium text-start">Shipping Address</p>
              <p className="text-xs min-[350px]:text-sm text-gray-600 text-start text-wrap ">Enter address for effortless checkout</p>
            </div>

            {/* Hover Animation */}
            <span className="absolute inset-0 bg-[#cbb0a8ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
            </Button>

            </div>
            
            

          <Button variant="outline" >
            <MdExitToApp size={28}/> LogOut
          </Button>
            
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {/* Content Section (This can be dynamic based on selected sidebar item) */}
          <div className="w-full h-full">
            {showMyOrders ? <MyOrders /> : null}
            {showShippingAdd ? <UserForm /> : null}
          </div>
        </div>
      </div>
      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
