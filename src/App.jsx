import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatBot from "./pages/Chatbot";
import Pricing from "./pages/Pricing";
import StudyPlanner from "./pages/StudyPlanner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}
