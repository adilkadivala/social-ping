
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";
import type { User } from "../config/supabase";

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Access token required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as { userId: string };

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
