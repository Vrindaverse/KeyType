// server/routes/auth.ts
import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.ts";
import { users } from "../drizzle/schema/users.ts";
import { eq } from "drizzle-orm";

const router = express.Router();

/**
 * Signup route
 */
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();

    // Check if user exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail));

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        username,
        email: normalizedEmail,
        password: hashedPassword,
      })
      .returning();

    res.status(201).json({
      message: "User created",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

/**
 * Login route
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    console.log("🔍 Login attempt with:", normalizedEmail);

    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail));

    console.log("📦 Found users:", foundUsers);

    if (foundUsers.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = foundUsers[0];

    const isValid = await bcrypt.compare(password, user.password);
    console.log("🔑 Password valid?", isValid);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


export default router;
