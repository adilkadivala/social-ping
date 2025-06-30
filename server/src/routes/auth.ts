import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { supabase } from "../config/supabase";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = express.Router();
const SALT_ROUNDS = 10;

// Register
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").trim().isLength({ min: 2 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, name } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email,
          password: hashedPassword,
          email_confirm: true,
        });

      if (authError || !authData?.user) {
        res
          .status(400)
          .json({ error: authError?.message || "Unable to create user" });
        return;
      }

      // Create user profile in Supabase DB
      const { data: user, error: dbError } = await supabase
        .from("users")
        .insert([
          {
            id: authData.user.id,
            email,
            name,
            password: hashedPassword,
            plan: "free",
          },
        ])
        .select()
        .single();

      if (dbError) {
        res.status(400).json({ error: dbError.message });
        return;
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "7d" }
      );

      delete user.password;

      res.status(201).json({
        message: "User created successfully",
        token,
        user,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Login
router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").exists()],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      // Authenticate using Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (authError || !authData?.user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Fetch user profile
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userError || !user) {
        res.status(401).json({ error: "User not found" });
        return;
      }

      // Optional: Compare hashed password (if stored in DB)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "7d" }
      );

      delete user.password;

      res.json({
        message: "Login successful",
        token,
        user,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get current user
router.get(
  "/me",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", req.user!.id)
        .single();

      if (error || !user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      delete user.password;

      res.json(user);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Logout
router.post(
  "/logout",
  authenticateToken,
  async (_req: AuthRequest, res: Response): Promise<void> => {
    try {
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
