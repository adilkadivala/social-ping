"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OverviewChart } from "@/components/charts/overview-chart";
import { SentimentChart } from "@/components/charts/sentiment-chart";
import { PlatformChart } from "@/components/charts/platform-chart";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Bell,
  Users,
  BarChart3,
  Twitter,
  ExternalLink,
  Eye,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your mentions.
          </p>
        </div>
        <Button>View All Mentions</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Mentions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Mentions
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>{" "}
              from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Sentiment
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2%
              </span>{" "}
              positive sentiment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Keywords
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 keywords added this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Mentions Overview</CardTitle>
            <CardDescription>
              Your mention trends over the last 7 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* Sentiment Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Breakdown of mention sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <SentimentChart />
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance & Recent Mentions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Mentions by social media platform</CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformChart />
          </CardContent>
        </Card>

        {/* Recent Mentions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Mentions</CardTitle>
            <CardDescription>
              Latest mentions across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: 1,
                platform: "twitter",
                text: "Just discovered SocialPing and it's amazing! Perfect for tracking brand mentions.",
                author: "@johndoe",
                time: "2 hours ago",
                sentiment: "positive",
                isRead: false,
              },
              {
                id: 2,
                platform: "reddit",
                text: "Has anyone tried SocialPing for social media monitoring? Looking for reviews.",
                author: "u/techuser",
                time: "4 hours ago",
                sentiment: "neutral",
                isRead: true,
              },
              {
                id: 3,
                platform: "twitter",
                text: "SocialPing helped us catch a viral mention before it exploded. Highly recommend!",
                author: "@startupfounder",
                time: "6 hours ago",
                sentiment: "positive",
                isRead: false,
              },
            ].map((mention) => (
              <div
                key={mention.id}
                className={`p-4 rounded-lg border ${
                  !mention.isRead
                    ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                    : "bg-muted/30"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1 rounded-full ${
                        mention.platform === "twitter"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {mention.platform === "twitter" ? (
                        <Twitter className="w-3 h-3 text-white" />
                      ) : (
                        <MessageSquare className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {mention.author}
                    </span>
                    <Badge
                      variant={
                        mention.sentiment === "positive"
                          ? "default"
                          : mention.sentiment === "negative"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {mention.sentiment}
                    </Badge>
                    {!mention.isRead && (
                      <Badge variant="default" className="bg-blue-500 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {mention.text}
                </p>
                <p className="text-xs text-muted-foreground">{mention.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your social monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Add Keyword</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Bell className="h-6 w-6" />
              <span>Setup Alerts</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}