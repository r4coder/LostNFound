// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // ✅

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Context must wrap App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
