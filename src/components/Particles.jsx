import React from "react";
import { motion } from "framer-motion";

const Particle = ({ size, x, y, delay, color }) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{ width: size, height: size, top: y, left: x }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.7, 0], y: [0, -20, 0] }}
    transition={{ repeat: Infinity, duration: 4 + Math.random() * 3, delay }}
  />
);

function Particles() {
  const particleCount = 15;
  const colors = ["bg-[#8e2de2]/40", "bg-cyan-400/30"];

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    size: 10 + Math.random() * 20,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, idx) => (
        <Particle
          key={idx}
          size={p.size}
          x={p.x}
          y={p.y}
          delay={p.delay}
          color={p.color}
        />
      ))}
    </div>
  );
}

export default Particles;
