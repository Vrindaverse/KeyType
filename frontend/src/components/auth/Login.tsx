"use client";

import { useState } from "react";
import InputField from "../ui/InputField";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      triggerToast("Please enter both username and password!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed!");
      }

      // ✅ Save tokens + user info
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("username", data.username);
      if (data.avatarUrl) localStorage.setItem("avatarUrl", data.avatarUrl);

      triggerToast(`Logged in as ${data.username} ✅`, "success");

      setUsername("");
      setPassword("");

      // ✅ Reload to update Navbar immediately
      setTimeout(() => window.location.reload(), 800);
    } catch (err: any) {
      triggerToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const triggerToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex items-center justify-center px-6 relative">
      <div className="w-full max-w-md p-5 bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.25)] flex flex-col gap-8">
        <h2 className="text-3xl font-passero text-center text-black">LOGIN</h2>

        <div className="flex flex-col gap-5">
          <InputField label="Username" value={username} setValue={setUsername} placeholder="Your username" />
          <InputField label="Password" value={password} setValue={setPassword} placeholder="Enter your password" type="password" />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-15 py-3 bg-black text-white rounded-lg font-passero shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:scale-105 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.3)] transition-transform mt-1 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg font-passero text-white transform transition-transform duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } ${showToast ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
