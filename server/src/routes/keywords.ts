import express, { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Keyword from '../models/Keyword';

const router = express.Router();

// Get user's keywords
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const keywords = await Keyword.find({ userId: req.user!._id }).sort({ createdAt: -1 });
    res.json(keywords);
  } catch (error) {
    console.error('Get keywords error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add keyword
router.post('/', [
  authenticateToken,
  body('keyword').trim().isLength({ min: 1, max: 100 })
], async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { keyword } = req.body;
    const userId = req.user!._id;

    // Check keyword limits based on plan
    const existingKeywords = await Keyword.countDocuments({ userId, isActive: true });
    const user = req.user!;
    
    let maxKeywords = 1; // free plan
    if (user.plan === 'pro') maxKeywords = 5;
    if (user.plan === 'enterprise') maxKeywords = Infinity;

    if (existingKeywords >= maxKeywords) {
      res.status(400).json({ 
        error: `Keyword limit reached for ${user.plan} plan. Upgrade to add more keywords.` 
      });
      return;
    }

    // Check if keyword already exists for user
    const existingKeyword = await Keyword.findOne({ userId, keyword: keyword.toLowerCase() });
    if (existingKeyword) {
      res.status(400).json({ error: 'Keyword already exists' });
      return;
    }

    const newKeyword = new Keyword({
      userId,
      keyword: keyword.toLowerCase()
    });

    await newKeyword.save();
    res.status(201).json(newKeyword);
  } catch (error) {
    console.error('Add keyword error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete keyword
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const keyword = await Keyword.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!keyword) {
      res.status(404).json({ error: 'Keyword not found' });
      return;
    }

    res.json({ message: 'Keyword deleted successfully' });
  } catch (error) {
    console.error('Delete keyword error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle keyword active status
router.patch('/:id/toggle', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const keyword = await Keyword.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!keyword) {
      res.status(404).json({ error: 'Keyword not found' });
      return;
    }

    keyword.isActive = !keyword.isActive;
    await keyword.save();

    res.json(keyword);
  } catch (error) {
    console.error('Toggle keyword error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;