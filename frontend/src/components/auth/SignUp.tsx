"use client";

import { useState } from "react";
import InputField from "../ui/InputField";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Signup failed!");
      }

      // ✅ Save user info directly
      localStorage.setItem("username", data.username);
      if (data.avatarUrl) localStorage.setItem("avatarUrl", data.avatarUrl);

      alert(`Account created for ${data.username} ✅`);

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // ✅ Reload so Navbar updates
      setTimeout(() => window.location.reload(), 800);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 mt-5">
      <div className="w-full max-w-md p-10 bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.25)] flex flex-col gap-8">
        <h2 className="text-3xl font-passero text-center text-black">Create Your Account</h2>

        <div className="flex flex-col gap-5">
          <InputField label="Username" value={username} setValue={setUsername} placeholder="Your cool username" />
          <InputField label="Email" value={email} setValue={setEmail} placeholder="you@example.com" type="email" />
          <InputField label="Password" value={password} setValue={setPassword} placeholder="Enter your password" type="password" />
          <InputField label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} placeholder="Re-enter your password" type="password" />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full px-5 py-3 bg-black text-white rounded-lg font-passero shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:scale-105 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.3)] mt-4 transition-transform disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
