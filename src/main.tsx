import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <App />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
