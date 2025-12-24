import React from "react";
import Particles from "react-tsparticles";

function AIChatMockup() {
  const messages = [
    { type: "ai", text: "Hello! I’m your AI study assistant." },
    { type: "user", text: "Can you tell me what is photosynthesis?" },
    {
      type: "ai",
      text: "Sure! Photosynthesis is how plants convert sunlight into energy.",
    },
    { type: "user", text: "Great! Give me a summary." },
    {
      type: "ai",
      text: "Plants use sunlight, water, and CO2 to produce glucose and oxygen.",
    },
  ];

  return (
    <div className="relative w-full max-w-md h-[400px] md:h-96 bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-lg overflow-y-auto flex flex-col p-4 mb-6 mt-6">
      {/* Particles background */}
      <Particles
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#6a0dad" }, // purple accent
            links: { enable: true, color: "#ff6b6b", distance: 80 },
            move: { enable: true, speed: 1.2 },
            number: { value: 40 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: { min: 0.2, max: 0.6 } },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Messages container */}
      <div className="relative flex-1 flex flex-col overflow-y-auto gap-2 z-10">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-xl max-w-[75%] break-words ${
              msg.type === "ai"
                ? "bg-[#6a0dad] text-white self-start"
                : "bg-[#ff6b6b] text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIChatMockup;
