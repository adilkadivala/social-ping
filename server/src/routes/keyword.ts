import express, { Response } from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { supabase } from "../config/supabase";

const router = express.Router();

// Get user's keywords
router.get(
  "/fetch",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { data: keywords, error } = await supabase
        .from("keywords")
        .select("*")
        .eq("user_id", req.user!.id)
        .order("created_at", { ascending: false });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.json(keywords);
    } catch (error) {
      console.error("Get keywords error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Add keyword
router.post(
  "/addkeywords",
  [authenticateToken, body("keyword").trim().isLength({ min: 1, max: 100 })],
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { keyword } = req.body;
      const userId = req.user!.id;

      // Check keyword limits based on plan
      const { count: existingKeywords } = await supabase
        .from("keywords")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_active", true);

      const user = req.user!;

      let maxKeywords = 1; // free plan
      if (user.plan === "pro") maxKeywords = 5;
      if (user.plan === "enterprise") maxKeywords = Infinity;

      if ((existingKeywords || 0) >= maxKeywords) {
        res.status(400).json({
          error: `Keyword limit reached for ${user.plan} plan. Upgrade to add more keywords.`,
        });
        return;
      }

      // Check if keyword already exists for user
      const { data: existingKeyword } = await supabase
        .from("keywords")
        .select("id")
        .eq("user_id", userId)
        .eq("keyword", keyword.toLowerCase())
        .single();

      if (existingKeyword) {
        res.status(400).json({ error: "Keyword already exists" });
        return;
      }

      const { data: newKeyword, error } = await supabase
        .from("keywords")
        .insert([
          {
            user_id: userId,
            keyword: keyword.toLowerCase(),
          },
        ])
        .select()
        .single();

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(201).json(newKeyword);
    } catch (error) {
      console.error("Add keyword error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete keyword
router.delete(
  "/deletekeywords/:id",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { error } = await supabase
        .from("keywords")
        .delete()
        .eq("id", req.params.id)
        .eq("user_id", req.user!.id);

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.json({ message: "Keyword deleted successfully" });
    } catch (error) {
      console.error("Delete keyword error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Toggle keyword active status
router.patch(
  "/updatekeywords/:id/toggle",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // First get the current keyword
      const { data: keyword, error: fetchError } = await supabase
        .from("keywords")
        .select("*")
        .eq("id", req.params.id)
        .eq("user_id", req.user!.id)
        .single();

      if (fetchError || !keyword) {
        res.status(404).json({ error: "Keyword not found" });
        return;
      }

      // Toggle the active status
      const { data: updatedKeyword, error: updateError } = await supabase
        .from("keywords")
        .update({ is_active: !keyword.is_active })
        .eq("id", req.params.id)
        .eq("user_id", req.user!.id)
        .select()
        .single();

      if (updateError) {
        res.status(500).json({ error: updateError.message });
        return;
      }

      res.json(updatedKeyword);
    } catch (error) {
      console.error("Toggle keyword error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
