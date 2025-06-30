import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { supabase } from '../config/supabase';

const router = express.Router();

// Get user's mentions
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const { data: mentions, error } = await supabase
      .from('mentions')
      .select(`
        *,
        keyword:keywords(keyword)
      `)
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    const { count: total } = await supabase
      .from('mentions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user!.id);

    res.json({
      mentions,
      pagination: {
        page,
        limit,
        total: total || 0,
        pages: Math.ceil((total || 0) / limit)
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
    const { data: mention, error } = await supabase
      .from('mentions')
      .update({ is_read: true })
      .eq('id', req.params.id)
      .eq('user_id', req.user!.id)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

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
    const userId = req.user!.id;
    
    // Get total mentions
    const { count: total } = await supabase
      .from('mentions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get unread mentions
    const { count: unread } = await supabase
      .from('mentions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    // Get platform breakdown
    const { data: platformStats } = await supabase
      .from('mentions')
      .select('platform')
      .eq('user_id', userId);

    const twitter = platformStats?.filter(m => m.platform === 'twitter').length || 0;
    const reddit = platformStats?.filter(m => m.platform === 'reddit').length || 0;
    const linkedin = platformStats?.filter(m => m.platform === 'linkedin').length || 0;
    const youtube = platformStats?.filter(m => m.platform === 'youtube').length || 0;

    res.json({
      total: total || 0,
      unread: unread || 0,
      twitter,
      reddit,
      linkedin,
      youtube
    });
  } catch (error) {
    console.error('Get mention stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;