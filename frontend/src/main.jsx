import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster
  position="top-right"
  toastOptions={{
    style: {
      borderRadius: "10px",
      background: "#1f2937",
      color: "#fff",
    },
  }}
/>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);