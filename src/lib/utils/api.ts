import axios from "axios";

export const signupUser = async (data: { username: string; email: string; password: string }) => {
  return await axios.post("/api/auth/signup", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return await axios.post("/api/auth/login", data);
};
