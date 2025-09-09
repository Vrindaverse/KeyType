import { createContext, useContext } from "react";
import { loginUser as loginApi, signupUser as signupApi } from "../lib/utils/api";

interface AuthContextType {
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loginUser: async () => {},
  signupUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await loginApi({ email, password });
      console.log("Login successful:", response.data);
      // Optionally save token/session
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const signupUser = async (username: string, email: string, password: string) => {
    try {
      const response = await signupApi({ username, email, password });
      console.log("Signup successful:", response.data);
      alert("Signup successful! You can now login.");
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
