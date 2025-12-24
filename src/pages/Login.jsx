import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Particles from "../components/Particles";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Navbar />

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center py-24 px-4 relative overflow-hidden mt-20">
        {/* Particles */}
        <Particles
          options={{
            background: { color: { value: "transparent" } },
            particles: {
              number: { value: 40 },
              color: { value: "#FFD93D" },
              links: { enable: true, color: "#FFD93D", distance: 120 },
              move: { enable: true, speed: 1 },
              opacity: { value: 0.4 },
              size: { value: 2 },
            },
          }}
          className="absolute inset-0 z-0"
        />

        {/* Glow blobs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#FFD93D] opacity-20 blur-3xl rounded-full z-0" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-[#6a0dad] opacity-20 blur-3xl rounded-full z-0" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-[#6a0dad] dark:text-[#FFD93D] mb-6">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {/* Animated Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                <input type="email" placeholder="Email" className="input" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                />

                <button className="primary-btn">Login</button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                <input type="email" placeholder="Email" className="input" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                />

                <button className="primary-btn">Sign Up</button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* OR */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Social */}
          <div className="flex gap-4 justify-center">
            <button className="social-btn">
              <FcGoogle size={20} /> Google
            </button>
            <button className="social-btn dark">
              <FaGithub size={20} /> GitHub
            </button>
          </div>

          {/* Toggle */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-[#6a0dad] dark:text-[#FFD93D] hover:underline"
            >
              {isLogin ? "Create new account" : "Login here"}
            </button>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
