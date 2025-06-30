import axios from "axios";

export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  created_utc: number;
  permalink: string;
  subreddit: string;
  score: number;
  num_comments: number;
}

export class RedditService {
  async searchPosts(
    keyword: string,
    limit: number = 10
  ): Promise<RedditPost[]> {
    try {
      const response = await axios.get("https://www.reddit.com/search.json", {
        params: {
          q: keyword,
          limit: limit,
          sort: "new",
          t: "day", // Last 24 hours
        },
        headers: {
          "User-Agent": "SocialPing/1.0",
        },
      });

      return response.data.data.children.map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        selftext: child.data.selftext,
        author: child.data.author,
        created_utc: child.data.created_utc,
        permalink: `https://reddit.com${child.data.permalink}`,
        subreddit: child.data.subreddit,
        score: child.data.score,
        num_comments: child.data.num_comments,
      }));
    } catch (error) {
      console.error("Reddit API Error:", error);
      throw new Error("Failed to fetch Reddit posts");
    }
  }
}
