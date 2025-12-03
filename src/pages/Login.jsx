import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Accept anything, move to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center text-white">
      <div className="bg-gray-900/80 border border-cyan-500 rounded-xl shadow-lg p-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-cyan-400 mb-6">
          THE SILENT DIRECTORY
        </h1>
        <p className="text-center text-gray-400 mb-8 tracking-wider">
          Enter the shadows to proceed...
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-black border border-cyan-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-black border border-cyan-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            ENTER DIRECTORY
          </button>
        </form>
      </div>
    </div>
  );
}
