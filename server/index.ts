// server/index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.ts";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ Match Vite proxy (/api/auth)
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
