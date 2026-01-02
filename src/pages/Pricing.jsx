import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function Pricing() {
  const plans = [
    { name: "1 Month", price: "Rs. 499", duration: "1 month" },
    {
      name: "3 Months",
      price: "Rs. 1399",
      duration: "3 months",
      popular: true,
    },
    { name: "6 Months", price: "Rs. 2499", duration: "6 months" },
    { name: "12 Months", price: "Rs. 4999", duration: "12 months" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-20 bg-gradient-to-r from-[#6a0dad] to-[#ff6b6b] text-white text-center overflow-hidden rounded-b-3xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Choose Your Plan
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Select a subscription plan that fits your learning goals and start
          studying smarter with Pathshala AI.
        </motion.p>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-6 md:px-20 flex flex-wrap justify-center gap-8 relative">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl flex flex-col items-center text-center w-72 cursor-pointer relative shadow-xl transition-transform duration-150"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
            whileHover={{
              scale: 1.08,
              y: -5,
              boxShadow:
                "0 0 30px 5px rgba(255, 217, 61, 0.6), 0 0 20px 2px rgba(106,13,173,0.5)",
              transition: { duration: 0.15, ease: "easeOut" },
            }}
          >
            {plan.popular && (
              <div className="absolute top-[-10px] right-[-10px] bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2 text-[#6a0dad] dark:text-[#FFD93D]">
              {plan.name}
            </h3>
            <p className="text-3xl font-extrabold mb-4 text-gray-900">{plan.price}</p>
            <button className="bg-[#6a0dad] dark:bg-[#FFD93D] text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold hover:scale-110 hover:shadow-[0_0_20px_#FFD93D] transition-transform duration-150">
              Subscribe
            </button>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;
