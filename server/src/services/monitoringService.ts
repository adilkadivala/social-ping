import { TwitterService } from './twitterService';
import { RedditService } from './redditService';
import { EmailService } from './emailService';
import Keyword from '../models/Keyword';
import Mention from '../models/Mention';
import User from '../models/User';

export class MonitoringService {
  private twitterService: TwitterService;
  private redditService: RedditService;
  private emailService: EmailService;

  constructor() {
    this.twitterService = new TwitterService();
    this.redditService = new RedditService();
    this.emailService = new EmailService();
  }

  async monitorAllKeywords(): Promise<void> {
    try {
      console.log('🔍 Starting monitoring cycle...');
      
      const keywords = await Keyword.find({ isActive: true }).populate('userId');
      
      for (const keyword of keywords) {
        await this.monitorKeyword(keyword);
      }
      
      console.log('✅ Monitoring cycle completed');
    } catch (error) {
      console.error('❌ Monitoring error:', error);
    }
  }

  private async monitorKeyword(keyword: any): Promise<void> {
    const newMentions: any[] = [];

    try {
      // Monitor Twitter
      if (process.env.TWITTER_BEARER_TOKEN) {
        const twitterResults = await this.twitterService.searchTweets(keyword.keyword);
        
        for (const tweet of twitterResults.tweets) {
          const user = twitterResults.users.find(u => u.id === tweet.author_id);
          const tweetUrl = `https://twitter.com/${user?.username}/status/${tweet.id}`;
          
          const existingMention = await Mention.findOne({ url: tweetUrl });
          
          if (!existingMention) {
            const mention = new Mention({
              userId: keyword.userId._id,
              keywordId: keyword._id,
              platform: 'twitter',
              text: tweet.text,
              url: tweetUrl,
              author: user?.username || 'Unknown',
              publishedAt: new Date(tweet.created_at)
            });
            
            await mention.save();
            newMentions.push(mention);
          }
        }
      }

      // Monitor Reddit
      const redditPosts = await this.redditService.searchPosts(keyword.keyword);
      
      for (const post of redditPosts) {
        const existingMention = await Mention.findOne({ url: post.permalink });
        
        if (!existingMention) {
          const mention = new Mention({
            userId: keyword.userId._id,
            keywordId: keyword._id,
            platform: 'reddit',
            text: post.title + (post.selftext ? ` - ${post.selftext.substring(0, 200)}...` : ''),
            url: post.permalink,
            author: post.author,
            publishedAt: new Date(post.created_utc * 1000)
          });
          
          await mention.save();
          newMentions.push(mention);
        }
      }

      // Send email alerts for new mentions
      if (newMentions.length > 0 && keyword.userId.plan !== 'free') {
        await this.emailService.sendMentionAlert(
          keyword.userId.email,
          keyword.keyword,
          newMentions
        );
      }

    } catch (error) {
      console.error(`Error monitoring keyword "${keyword.keyword}":`, error);
    }
  }
}