import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const LandingPage = () => {
  const handleGoogleSignIn = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BACKEND_URL
    }/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 to-orange-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500 opacity-20 rounded-full blur-3xl"></div> */}
        <img 
          src="\LandingPage5.jpg" 
          className=" w-full h-full object-cover "
         />
      </div>

      

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block p-4 rounded-full  mb-4"
        >
          <img 
            src=" /logo.png"
            alt="Company Logo"
            className="w-20 p-0.5 object-contain"
           />
         
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-bold mb-2 "
        >
          <p className="text-3xl min-[380px]:text-4xl text-black/80 mr-2 ">Welcome to</p>
          <p className=" font-serif capitalize text-red-600 text-4xl min-[380px]:text-5xl " >Shree Swastik</p>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#ff3496] dark:text-gray-500 mb-6 "
        >
          <p>You can get all the items related to puja</p>
          <p>for all the festival seasons and daily needs.</p>
                     
        </motion.p>
      </motion.div>

      {/* Sign-In Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Button
          variant={"ghost"}
          className="w-full flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2"
          onClick={() => handleGoogleSignIn()}
        >
          <FcGoogle /> Login with Google
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
