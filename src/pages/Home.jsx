import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Book, FileText, Cpu, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import AIChatMockup from "../components/AIChatMockup";
import Particles from "../components/Particles";

function Home() {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      icon: <Book className="w-12 h-12 text-[#ff6b6b]" />,
      title: "Explaination",
      desc: "Simple explanations for complex topics.",
    },
    {
      icon: <FileText className="w-12 h-12 text-cyan-400" />,
      title: "Smart Summaries",
      desc: "Summarize chapters or notes quickly.",
    },
    {
      icon: <Cpu className="w-12 h-12 text-[#ff6b6b]" />,
      title: "Instant Quiz",
      desc: "Generate MCQs from content.",
    },
    {
      icon: <Calendar className="w-12 h-12 text-cyan-400" />,
      title: "AI Study Planner",
      desc: "Plan daily study tasks.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#6a0dad] to-[#ff6b6b] text-white overflow-hidden">
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
                distance: 150,
                opacity: 0.3,
              },
              move: { enable: true, speed: 1.8, outMode: "bounce" },
              number: { value: 70 },
              size: { value: { min: 1, max: 4 } },
              opacity: { value: { min: 0.2, max: 0.6 } },
            },
          }}
          className="absolute top-0 left-0 w-full h-full z-0"
        />

        {/* Futuristic Glow Orbs */}
        <div className="absolute top-0 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD93D] opacity-20 blur-3xl animate-pulse z-0"></div>
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full bg-[#ffffff] opacity-10 blur-2xl animate-pulse z-0"></div>

        {/* Hero Text */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left order-1 md:order-1 relative z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-shadow-lg">
            Study Smarter. Not Longer.
          </h1>
          <p className="text-lg md:text-xl">
            AI-powered study assistant — explain, summarize, generate quizzes,
            and plan your study efficiently.
          </p>

          {/* Let's Chat / Start Button */}
          <motion.button
            className="mt-6 bg-white text-[#6a0dad] font-bold px-10 py-5 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 hover:shadow-[0_0_30px_#FFD93D] hover:shadow-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.12 }}
            onClick={() => {
              // Scroll to AIChatMockup or trigger chat start
              document
                .getElementById("ai-chat")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Let&apos;s Chat
          </motion.button>
        </motion.div>

        {/* AI Chat Mockup */}
        <motion.div
          id="ai-chat"
          className="md:w-1/2 mb-10 md:mb-0 flex justify-center order-2 md:order-2 relative z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AIChatMockup />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center text-center cursor-pointer transition-transform duration-150 ${
                activeCard === index ? "scale-110 shadow-2xl" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.02 * index, // almost simultaneous
                duration: 0.15, // very fast tween
                ease: "easeOut", // smooth, quick settle
              }}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.12, ease: "easeOut" },
              }}
              whileTap={{
                scale: 1.12, // small pop on click
                transition: { duration: 0.08, ease: "easeOut" },
              }}
            >
              {feature.icon}
              <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
