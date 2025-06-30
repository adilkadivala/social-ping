import { TwitterService } from "./twitterService";
import { RedditService } from "./redditService";
import { EmailService } from "./emailService";
import { supabase } from "../config/databse";
import type { Keyword, User, Mention } from "../config/databse";

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
      console.log("🔍 Starting monitoring cycle...");

      // Get all active keywords with user info
      const { data: keywords, error } = await supabase
        .from("keywords")
        .select(
          `
          *,
          user:users(*)
        `
        )
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching keywords:", error);
        return;
      }

      for (const keyword of keywords || []) {
        await this.monitorKeyword(keyword);
      }

      console.log("✅ Monitoring cycle completed");
    } catch (error) {
      console.error("❌ Monitoring error:", error);
    }
  }

  private async monitorKeyword(keyword: any): Promise<void> {
    const newMentions: Mention[] = [];

    try {
      console.log(
        `🔍 Monitoring keyword: "${keyword.keyword}" for user: ${keyword.user.email}`
      );

      // Monitor Twitter
      if (process.env.TWITTER_BEARER_TOKEN) {
        const twitterResults = await this.twitterService.searchTweets(
          keyword.keyword
        );

        for (const tweet of twitterResults.tweets) {
          const user = twitterResults.users.find(
            (u) => u.id === tweet.author_id
          );
          const tweetUrl = `https://twitter.com/${user?.username}/status/${tweet.id}`;

          // Check if mention already exists
          const { data: existingMention } = await supabase
            .from("mentions")
            .select("id")
            .eq("url", tweetUrl)
            .single();

          if (!existingMention) {
            const { data: mention, error } = await supabase
              .from("mentions")
              .insert([
                {
                  user_id: keyword.user_id,
                  keyword_id: keyword.id,
                  platform: "twitter",
                  text: tweet.text,
                  url: tweetUrl,
                  author: user?.username || "Unknown",
                  published_at: new Date(tweet.created_at).toISOString(),
                  sentiment: this.analyzeSentiment(tweet.text),
                },
              ])
              .select()
              .single();

            if (!error && mention) {
              newMentions.push(mention);
            }
          }
        }
      }

      // Monitor Reddit
      const redditPosts = await this.redditService.searchPosts(keyword.keyword);

      for (const post of redditPosts) {
        // Check if mention already exists
        const { data: existingMention } = await supabase
          .from("mentions")
          .select("id")
          .eq("url", post.permalink)
          .single();

        if (!existingMention) {
          const { data: mention, error } = await supabase
            .from("mentions")
            .insert([
              {
                user_id: keyword.user_id,
                keyword_id: keyword.id,
                platform: "reddit",
                text:
                  post.title +
                  (post.selftext
                    ? ` - ${post.selftext.substring(0, 200)}...`
                    : ""),
                url: post.permalink,
                author: post.author,
                published_at: new Date(post.created_utc * 1000).toISOString(),
                sentiment: this.analyzeSentiment(
                  post.title + " " + post.selftext
                ),
              },
            ])
            .select()
            .single();

          if (!error && mention) {
            newMentions.push(mention);
          }
        }
      }

      // Send email alerts for new mentions (only for paid plans)
      if (newMentions.length > 0 && keyword.user.plan !== "free") {
        await this.emailService.sendMentionAlert(
          keyword.user.email,
          keyword.keyword,
          newMentions
        );
      }

      if (newMentions.length > 0) {
        console.log(
          `✅ Found ${newMentions.length} new mentions for "${keyword.keyword}"`
        );
      }
    } catch (error) {
      console.error(`❌ Error monitoring keyword "${keyword.keyword}":`, error);
    }
  }

  private analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
    // Simple sentiment analysis - you can replace with a proper service
    const positiveWords = [
      "good",
      "great",
      "awesome",
      "excellent",
      "amazing",
      "love",
      "best",
      "fantastic",
    ];
    const negativeWords = [
      "bad",
      "terrible",
      "awful",
      "hate",
      "worst",
      "horrible",
      "sucks",
      "disappointing",
    ];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter((word) =>
      lowerText.includes(word)
    ).length;
    const negativeCount = negativeWords.filter((word) =>
      lowerText.includes(word)
    ).length;

    if (positiveCount > negativeCount) return "positive";
    if (negativeCount > positiveCount) return "negative";
    return "neutral";
  }
}
