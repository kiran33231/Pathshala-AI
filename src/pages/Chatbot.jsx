import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import summarizeIcon from "../assets/Images/summarize.png";
import explainIcon from "../assets/Images/explain.png";
import quizIcon from "../assets/Images/quiz.png";
import pdfIcon from "../assets/Images/pdf.png";
import uploadIcon from "../assets/Images/upload_white.png";
import micIcon from "../assets/Images/mic_white.png";
import sendIcon from "../assets/Images/send.png";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I’m Pathshala AI. Ask me anything 📚" },
  ]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [loading, setLoading] = useState(false);

  // 🎤 MIC STATE
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [lastAIContent, setLastAIContent] = useState("");

  const BASE_URL = "http://127.0.0.1:8000";

  /* ---------------- AUTO SCROLL ---------------- */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ---------------- SIDEBAR RESIZE ---------------- */
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- TYPEWRITER ---------------- */
  const typeWriter = (fullText, role = "ai") => {
    return new Promise((resolve) => {
      let i = 0;
      const aiMessage = { role, text: "" };
      setMessages((prev) => [...prev, aiMessage]);

      const interval = setInterval(() => {
        i++;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role,
            text: fullText.slice(0, i),
          };
          return copy;
        });
        scrollToBottom();
        if (i === fullText.length) {
          clearInterval(interval);
          resolve();
        }
      }, 20);
    });
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/ai/generate`, {
        content: input,
      });
      setLastAIContent(res.data.response);
      await typeWriter(res.data.response);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Failed to generate AI content." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- MIC LOGIC (Nepali Voice) ---------------- */
  const startMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ne-NP"; // Nepali voice

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);

      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(stopMic, 2000); // stop if silent
    };

    recognition.onerror = stopMic;
    recognition.onend = stopMic;

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    clearTimeout(silenceTimerRef.current);
    setIsListening(false);
  };

  /* ---------------- ACTION BUTTONS ---------------- */
  const runAction = async (type) => {
    if (!lastAIContent) return;
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/ai/${type}`, {
        content: lastAIContent,
      });
      setLastAIContent(res.data.response);
      await typeWriter(res.data.response);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `Failed to ${type}.` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main
        className={`flex-1 flex justify-center pt-24 px-2 ${
          isSidebarOpen ? "ml-64 md:ml-64" : "ml-0"
        }`}
      >
        <div className="w-full max-w-5xl flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
          <img
            src={pdfIcon}
            className="w-10 h-10 absolute top-4 right-4"
            alt="PDF"
          />

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div className="relative max-w-[75%]">
                  <div className="px-5 py-3 rounded-2xl text-sm whitespace-pre-line bg-gray-700 text-gray-100">
                    {msg.text}

                    {msg.role === "ai" && lastAIContent && !loading && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <button
                          onClick={() => runAction("summarize")}
                          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                        >
                          <img
                            src={summarizeIcon}
                            className="w-5 h-5"
                            alt="Summarize"
                          />
                          Summarize
                        </button>
                        <button
                          onClick={() => runAction("explain")}
                          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition"
                        >
                          <img
                            src={explainIcon}
                            className="w-5 h-5"
                            alt="Explain"
                          />
                          Explain
                        </button>
                        <button
                          disabled
                          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm transition cursor-not-allowed opacity-50"
                        >
                          <img
                            src={quizIcon}
                            className="w-5 h-5 opacity-50"
                            alt="Quiz"
                          />
                          Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-700 p-4 flex items-center gap-2">
            <img
              src={uploadIcon}
              className="w-6 h-6 cursor-pointer"
              alt="Upload"
            />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-700 text-white focus:outline-none"
            />

            {/* 🎤 MIC BUTTON — UI UNCHANGED */}
            <img
              src={micIcon}
              alt="Mic"
              className="w-6 h-6 cursor-pointer"
              onClick={startMic}
            />

            {/* 📤 SEND BUTTON — UI UNCHANGED */}
            <button onClick={sendMessage} disabled={loading}>
              <img
                src={sendIcon}
                alt="Send"
                className="w-8 h-8 bg-purple-600 rounded p-1"
              />
            </button>
          </div>
        </div>
      </main>

      {/* 🎤 MIC POPUP */}
      {isListening && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={stopMic}
        >
          <div
            className="bg-gray-900 px-6 py-5 rounded-xl text-center relative w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={stopMic}
              className="absolute top-2 right-2 text-white text-lg"
            >
              ✕
            </button>

            <p className="text-white mb-4">Pathshala AI is listening…</p>

            {/* 🔊 WAVE ANIMATION */}
            <div className="flex justify-center items-end gap-1 h-10">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="w-2 bg-purple-500 rounded-sm animate-wave"
                  style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔊 WAVE KEYFRAMES */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-wave {
          animation: wave 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
