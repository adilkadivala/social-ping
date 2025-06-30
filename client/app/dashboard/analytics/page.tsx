space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Share Rate</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -0.3%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                -15.3%
              </span>{" "}
              faster response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Mentions Trend</CardTitle>
            <CardDescription>
              Your mention volume and growth over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* Sentiment Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <CardDescription>How people feel about your brand</CardDescription>
          </CardHeader>
          <CardContent>
            <SentimentChart />
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance & Top Keywords */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>
              Mentions and engagement by platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformChart />
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Keywords</CardTitle>
            <CardDescription>
              Keywords generating the most engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                keyword: "SocialPing",
                mentions: 234,
                sentiment: "positive",
                growth: "+12%",
              },
              {
                keyword: "social monitoring",
                mentions: 189,
                sentiment: "positive",
                growth: "+8%",
              },
              {
                keyword: "brand tracking",
                mentions: 156,
                sentiment: "neutral",
                growth: "+15%",
              },
              {
                keyword: "mention alerts",
                mentions: 134,
                sentiment: "positive",
                growth: "+5%",
              },
              {
                keyword: "social analytics",
                mentions: 98,
                sentiment: "positive",
                growth: "+22%",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.keyword}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.mentions} mentions
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      item.sentiment === "positive" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {item.sentiment}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">
                    {item.growth}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Peak Activity Hours</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "9:00 AM", activity: 85 },
                { time: "1:00 PM", activity: 92 },
                { time: "6:00 PM", activity: 78 },
                { time: "9:00 PM", activity: 65 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.time}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.activity}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.activity}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Influencers</CardTitle>
            <CardDescription>
              Users with highest reach mentioning you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "@techcrunch", followers: "8.9M", mentions: 3 },
                { name: "@productHunt", followers: "2.1M", mentions: 5 },
                { name: "@startupgrind", followers: "1.8M", mentions: 2 },
                { name: "@venturebeat", followers: "1.2M", mentions: 1 },
              ].map((influencer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{influencer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {influencer.followers} followers
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {influencer.mentions} mentions
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>
              Where your mentions are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { country: "United States", percentage: 45 },
                { country: "United Kingdom", percentage: 18 },
                { country: "Canada", percentage: 12 },
                { country: "Australia", percentage: 8 },
                { country: "Germany", percentage: 6 },
                { country: "Others", percentage: 11 },
              ].map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {location.country}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {location.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

