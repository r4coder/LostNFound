import React from "react";
import { FaPlus } from "react-icons/fa";

const Navbar = ({ onPostClick }) => {
  return (
    <header className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">🎒 Lost & Found</h2>
        <button
          onClick={onPostClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all shadow-md"
        >
          <FaPlus /> Post Item
        </button>
      </div>
    </header>
  );
};

export default Navbar;
