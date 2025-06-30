"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api";
import { ExternalLink, Twitter, MessageSquare, Eye } from "lucide-react";

interface Mention {
  _id: string;
  platform: "twitter" | "reddit";
  text: string;
  url: string;
  author: string;
  publishedAt: string;
  isRead: boolean;
  keywordId: {
    keyword: string;
  };
}

export default function MentionsPage() {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    fetchMentions();
  }, [page]);

  const fetchMentions = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getMentions(page);
      setMentions(data.mentions);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching mentions:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (mentionId: string) => {
    try {
      await apiClient.markMentionAsRead(mentionId);
      setMentions(
        mentions.map((mention) =>
          mention._id === mentionId ? { ...mention, isRead: true } : mention
        )
      );
    } catch (error) {
      console.error("Error marking mention as read:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "reddit":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "bg-blue-500";
      case "reddit":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading && mentions.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mentions</h1>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mentions</h1>
        <Button onClick={fetchMentions} variant="outline">
          Refresh
        </Button>
      </div>

      {mentions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 mb-4">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No mentions yet</h3>
              <p>We'll notify you when someone mentions your keywords.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {mentions.map((mention) => (
              <Card
                key={mention._id}
                className={`transition-all hover:shadow-md ${
                  !mention.isRead ? "border-blue-200 bg-blue-50/30" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-full text-white ${getPlatformColor(
                          mention.platform
                        )}`}
                      >
                        {getPlatformIcon(mention.platform)}
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {mention.keywordId.keyword}
                      </Badge>
                      {!mention.isRead && (
                        <Badge variant="default" className="bg-blue-500">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {!mention.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(mention._id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-3 leading-relaxed">
                    {mention.text}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By @{mention.author}</span>
                    <span>{formatDate(mention.publishedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 py-2 text-sm text-gray-600">
                Page {page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
