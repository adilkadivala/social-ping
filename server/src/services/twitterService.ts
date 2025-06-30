import axios from "axios";

export interface TwitterMention {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  public_metrics: {
    retweet_count: number;
    like_count: number;
    reply_count: number;
  };
}

export interface TwitterUser {
  id: string;
  username: string;
  name: string;
}

export class TwitterService {
  private bearerToken: string;

  constructor() {
    this.bearerToken = process.env.TWITTER_BEARER_TOKEN || "";
  }

  async searchTweets(
    keyword: string,
    maxResults: number = 10
  ): Promise<{
    tweets: TwitterMention[];
    users: TwitterUser[];
  }> {
    try {
      const response = await axios.get(
        "https://api.twitter.com/2/tweets/search/recent",
        {
          headers: {
            Authorization: `Bearer ${this.bearerToken}`,
            "Content-Type": "application/json",
          },
          params: {
            query: keyword,
            max_results: maxResults,
            "tweet.fields": "created_at,author_id,public_metrics",
            "user.fields": "username,name",
            expansions: "author_id",
          },
        }
      );

      return {
        tweets: response.data.data || [],
        users: response.data.includes?.users || [],
      };
    } catch (error) {
      console.error("Twitter API Error:", error);
      throw new Error("Failed to fetch tweets");
    }
  }
}
