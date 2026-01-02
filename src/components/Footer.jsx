import React from "react";
import { Facebook, Github, Instagram } from "lucide-react";
import Particles from "./Particles";

function Footer() {
  // Add your profile URLs here
  const socialLinks = [
    { Icon: Facebook, url: "https://www.facebook.com/kirana.n.yaupane.2025" },
    { Icon: Instagram, url: "https://www.instagram.com/vidhayak.exe/" },
    { Icon: Github, url: "https://github.com/kiran33231" },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-[#6a0dad] to-[#ff6b6b] text-white py-12 px-6 md:px-20 overflow-hidden">
      {/* Particles background */}
      <Particles
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#FFD93D" },
            links: {
              enable: true,
              color: "#FFD93D",
              distance: 120,
              opacity: 0.2,
            },
            move: { enable: true, speed: 1.2, outMode: "bounce" },
            number: { value: 40 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: { min: 0.2, max: 0.5 } },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Futuristic Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#FFD93D] opacity-20 blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-[#ffffff] opacity-10 blur-2xl animate-pulse z-0"></div>

      <div className="relative z-10 text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-shadow-lg">
          Pathshala AI
        </h2>
        <p className="text-gray-100 text-sm md:text-base">
          Learn smarter, faster, and more efficiently with AI-powered study
          tools.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-4">
          {socialLinks.map(({ Icon, url }, idx) => (
            <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
              <Icon className="w-6 h-6 text-white hover:text-[#FFD93D] transition-all duration-200 hover:scale-125 hover:drop-shadow-[0_0_15px_#FFD93D] cursor-pointer" />
            </a>
          ))}
        </div>

        <p className="text-gray-200 text-xs mt-6">
          &copy; {new Date().getFullYear()} Pathshala AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
