import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Mention from '../models/Mention';

const router = express.Router();

// Get user's mentions
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const mentions = await Mention.find({ userId: req.user!._id })
      .populate('keywordId', 'keyword')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Mention.countDocuments({ userId: req.user!._id });

    res.json({
      mentions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get mentions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark mention as read
router.patch('/:id/read', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const mention = await Mention.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!._id },
      { isRead: true },
      { new: true }
    );

    if (!mention) {
      res.status(404).json({ error: 'Mention not found' });
      return;
    }

    res.json(mention);
  } catch (error) {
    console.error('Mark mention as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get mention statistics
router.get('/stats', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    
    const stats = await Mention.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          unread: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } },
          twitter: { $sum: { $cond: [{ $eq: ['$platform', 'twitter'] }, 1, 0] } },
          reddit: { $sum: { $cond: [{ $eq: ['$platform', 'reddit'] }, 1, 0] } }
        }
      }
    ]);

    const result = stats[0] || { total: 0, unread: 0, twitter: 0, reddit: 0 };
    delete result._id;

    res.json(result);
  } catch (error) {
    console.error('Get mention stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;