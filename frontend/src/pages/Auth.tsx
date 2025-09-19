import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../components/auth/Login";
import SignupForm from "../components/auth/SignUp";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 mt-5">
      <div className="w-full max-w-md p-10 bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.25)] flex flex-col gap-8">
        <h2 className="text-3xl font-passero text-center text-black">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>

        {/* AnimatePresence handles the fade-slide */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <LoginForm />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <SignupForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Switch link */}
        <div className="flex justify-center text-sm font-patrick mt-2">
          {isLogin ? (
            <>
              <span className="text-black/70">Don’t have an account? </span>
              <button
                onClick={() => setIsLogin(false)}
                className="ml-1 hover:underline text-black/90"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-black/70">Already have an account? </span>
              <button
                onClick={() => setIsLogin(true)}
                className="ml-1 hover:underline text-black/90"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
