import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart, FaStar, FaMagic } from "react-icons/fa";
import AllProducts from "./AllProducts";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
          <div className="absolute inset-0 z-0">
            <img
              // src="https://i.pinimg.com/736x/22/8f/c1/228fc1d81f89f58c5f1e93ade657cb3b.jpg"
              src="/hometop.jpg"
              alt="Background Mandala"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/10 to-orange-500/50 z-10"></div>
          <div className="container mx-auto z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4 leading-tight">
                  Elevate Your{" "}
                  <span className="text-orange-600">Spiritual Journey</span>
                </h1>
                <p className="text-xl md:text-2xl text-amber-700 mb-8">
                  Discover Premium Samagri for Divine Connections
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center justify-center mx-auto lg:mx-0"
                >
                  Explore Collection <FiShoppingCart className="w-5 h-5 ml-2" />
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <motion.div className="w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/07/39/63/34/1000_F_739633427_6dJ7PFHHiXr8VmimuchpIy4vClFejMh8.webp"
                    alt="Pooja Thali"
                    className="w-full h-full rounded-full"
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset- rounded-full border-4 border-dashed border-amber-500 opacity-30"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <AllProducts />

        {/* Benefits Section */}
        <section className="py-16 px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-12">
            Why Choose Our Samagri?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaMagic,
                title: "Pure & Authentic",
                description: "Sourced from the finest locations",
              },
              {
                icon: FaRegHeart,
                title: "Blessed with Love",
                description: "Prepared with utmost devotion",
              },
              {
                icon: FaStar,
                title: "Premium Quality",
                description: "Ensuring divine satisfaction",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-amber-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-16 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              // src="https://img.freepik.com/free-vector/background-template-design-with-mandala-patterns_1308-42779.jpg?ga=GA1.1.330176579.1710230107&semt=ais_hybrid"
              src="/homebottom.avif"
              alt="Background Mandala"
              className="w-full h-full object-cover opacity-5"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-12">
              Voices of Devotion
            </h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Radhyshyam Sharma",
                  image:
                    "https://media.istockphoto.com/id/1333001232/photo/portrait-of-indian-man-face-outdoors-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Ne-OChwAEFF5U7yxOwUUqA8ELrJ1WCYho4RkW9v360I=",
                  quote:
                    "The quality of the Pooja Samagri from this shop is unparalleled. It has truly enhanced my spiritual journey and brought a sense of peace to my daily rituals.",
                },
                {
                  name: "Jai Prakash Patel",
                  image:
                    "https://media.istockphoto.com/id/1367068216/photo/indian-farmer-stock-photo.jpg?s=612x612&w=0&k=20&c=oWgo7XuzHZAGlG55bsiyXwqvWIUBxkNMixpzORUOB7Q=",
                  quote:
                    "I've never felt more connected to my practices. The authenticity of these products is evident in every offering. Truly a blessing for any devotee.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <p className="text-lg text-amber-700 italic mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <p className="text-amber-800 font-semibold">
                      {testimonial.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
