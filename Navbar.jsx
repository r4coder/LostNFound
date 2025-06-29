import React from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ onPostClick }) => {
  const { user } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.reload(); // Refresh to reflect login
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <header className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">🎒 Lost & Found</h2>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-800 dark:text-white flex items-center gap-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                {user.displayName || user.email}
              </span>
              <button
                onClick={() => signOut(auth)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
              <button
                onClick={onPostClick}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all shadow-md"
              >
                <FaPlus /> Post Item
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
