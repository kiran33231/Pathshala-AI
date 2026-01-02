import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../assets/Images/icon.png";
import sidebarIcon from "../assets/Images/sidebar.png";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    localStorage.setItem("sidebarOpen", JSON.stringify(!isSidebarOpen));
  };

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Chatbot", path: "/chat" },
    { name: "Study Planner", path: "/planner" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Mobile Sidebar Icon (only on /chat) */}
        {location.pathname === "/chat" && (
          <div className="md:hidden mr-2">
            <button onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <X className="w-6 h-6 text-[#8e2de2]" />
              ) : (
                <img src={sidebarIcon} alt="Sidebar" className="w-6 h-6" />
              )}
            </button>
          </div>
        )}

        {/* Logo */}
        <div className="flex items-center mx-auto md:mx-0">
          <Link to="/">
            <img src={logo} alt="Pathshala AI" className="w-10 h-10 mr-2" />
          </Link>
          <span className="font-bold text-xl">Pathshala AI</span>
        </div>

        {/* Desktop / Tablet Menu (Animated underline) */}
        <div className="hidden md:flex space-x-6 mx-auto relative">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} className="relative px-1">
              <span className="font-semibold">{item.name}</span>

              {location.pathname === item.path && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500 rounded"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <button className="bg-[#8e2de2] px-3 py-1 rounded hover:bg-[#6b1db0]">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#8e2de2]" />
            ) : (
              <Menu className="w-6 h-6 text-[#8e2de2]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 px-6 pb-4 flex flex-col space-y-3 shadow-md">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-semibold ${
                location.pathname === item.path
                  ? "underline underline-offset-4 decoration-orange-500"
                  : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link to="/login">
            <button className="bg-[#8e2de2] px-3 py-1 rounded hover:bg-[#6b1db0] text-left">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
