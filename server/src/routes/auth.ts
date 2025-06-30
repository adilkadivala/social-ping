
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { supabase } from "../config/supabase";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").trim().isLength({ min: 2 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password, name } = req.body;

      // Create user in Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

      if (authError) {
        res.status(400).json({ error: authError.message });
        return;
      }

      // Create user profile in database
      const { data: user, error: dbError } = await supabase
        .from("users")
        .insert([
          {
            id: authData.user.id,
            email,
            name,
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;

      // Sign in with Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Get user profile
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userError) {
        res.status(401).json({ error: "User not found" });
        return;
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "7d" }
      );

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

      if (error) {
        res.status(404).json({ error: "User not found" });
        return;
      }

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
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // In a stateless JWT system, logout is handled client-side
      // But we can add token blacklisting here if needed
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;

