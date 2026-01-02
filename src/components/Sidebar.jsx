import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import sidebarIcon from "../assets/Images/sidebar.png";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const initialChats = [
    "Physics – Laws of Motion",
    "Maths – Vectors",
    "Chemistry – Periodic Table",
  ];

  const [savedChats, setSavedChats] = useState(initialChats);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const saveEdit = (index) => {
    if (editingText.trim() === "") return;
    setSavedChats((prev) =>
      prev.map((chat, idx) => (idx === index ? editingText : chat))
    );
    setEditingIndex(null);
    setEditingText("");
  };

  const deleteChat = (index) => {
    setSavedChats((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addNewChat = () => {
    const newChat = "New Chat";
    setSavedChats((prev) => [...prev, newChat]);
    setEditingIndex(savedChats.length);
    setEditingText(newChat);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white pt-24 px-2 border-r border-gray-800 z-40 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        `}
      >
        {isSidebarOpen && (
          <>
            {/* Toggle button above New Chat */}
            <div className="flex justify-center mb-2 px-2">
              <button
                onClick={toggleSidebar}
                className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* New Chat Button */}
            <button
              onClick={addNewChat}
              className="bg-purple-600 hover:bg-purple-700 transition py-2 rounded-lg mb-4 mt-4 w-full text-left px-4 font-medium truncate justify-center flex items-center"
            >
              + New Chat
            </button>

            <div className="text-xs text-gray-400 mb-2">Saved Chats</div>

            <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
              {savedChats.map((chat, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer transition min-w-0"
                >
                  {editingIndex === idx ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onBlur={() => saveEdit(idx)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(idx)}
                      className="flex-1 px-3 py-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 truncate"
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="flex-1 truncate text-sm">{chat}</span>
                      <div className="hidden group-hover:flex gap-2 flex-shrink-0">
                        <Pencil
                          className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer transition"
                          onClick={() => {
                            setEditingIndex(idx);
                            setEditingText(chat);
                          }}
                        />
                        <Trash2
                          className="w-4 h-4 text-gray-300 hover:text-red-400 cursor-pointer transition"
                          onClick={() => deleteChat(idx)}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto p-4 text-center text-xs text-gray-400 truncate">
              Prompts left: <span className="text-white font-medium">5</span>
            </div>
          </>
        )}
      </aside>

      {/* Toggle button for closed sidebar (PC) */}
      {!isSidebarOpen && window.innerWidth >= 768 && (
        <div className="fixed top-28 left-2 z-50">
          <button
            onClick={toggleSidebar}
            className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <img src={sidebarIcon} alt="Open Sidebar" className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
