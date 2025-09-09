import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 ">
      <div className="w-full max-w-md p-10 bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.25)] flex flex-col gap-8">
        <h2 className="text-3xl font-passero text-center text-black">Welcome Back!</h2>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          <InputField label="Email" value={email} setValue={setEmail} placeholder="you@example.com" type="email" />
          <InputField label="Password" value={password} setValue={setPassword} placeholder="Enter your password" type="password" />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full px-5 py-3 bg-black text-white rounded-lg font-passero shadow-[4px_4px_0px_rgba(0,0,0,0.25)] transform transition-all hover:scale-105 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.3)]"
        >
          Login
        </button>

        {/* Footer Link */}
        <div className="flex justify-center text-sm font-patrick mt-2">
          <span className="text-black/70">Don't have an account? </span>
          <a href="/signup" className="ml-1 hover:underline text-black/90">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

// Reusable Input component with zoom + shadow effect
const InputField = ({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  placeholder: string;
  type?: string;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-patrick text-black/80">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder={placeholder}
        className={`
          px-4 py-3 border-2 border-black rounded-lg font-patrick shadow-[2px_2px_0px_rgba(0,0,0,0.25)]
          transition-all duration-200 transform
          focus:outline-none focus:ring-0 focus:border-black
          ${value || isActive ? "scale-105 shadow-[3px_3px_0px_rgba(0,0,0,0.3)]" : ""}
        `}
      />
    </div>
  );
};
