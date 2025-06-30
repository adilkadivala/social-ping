import {
  ArrowRight,
  Bell,
  Search,
  BarChart3,
  Shield,
  Zap,
  Twitter,
  MessageSquare,
  Star,
  Users,
  TrendingUp,
  Globe,
  CheckCircle,
  Play,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              SocialPing
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <ThemeToggle />
            <Button asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Now monitoring 500K+ mentions daily
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Monitor Your Online
            <span className="text-primary block">Presence Everywhere</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant alerts when someone mentions your name, product, or
            brand across social media platforms. Never miss an important
            conversation again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="px-8 py-6 text-lg">
              <Link href="/sign-up">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-6 text-lg"
            >
              <Link href="#demo">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500K+</div>
              <div className="text-sm text-muted-foreground">
                Mentions Tracked
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive social media monitoring with real-time alerts and
              powerful analytics.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Large Feature Card */}
            <Card className="lg:col-span-2 lg:row-span-2 p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Multi-Platform Monitoring
                </CardTitle>
                <CardDescription className="text-base">
                  Track mentions across Twitter, Reddit, LinkedIn, and YouTube
                  comments in real-time.
                </CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Twitter/X Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">Reddit Monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">LinkedIn Posts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-red-500" />
                  <span className="text-sm">YouTube Comments</span>
                </div>
              </div>
            </Card>

            {/* Real-time Alerts */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Real-Time Alerts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant notifications via email when someone mentions your
                  keywords.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-700 dark:text-green-400">
                      Live monitoring active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Visualize mention trends and track sentiment over time.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Positive</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Collaboration */}
            <Card className="lg:col-span-2 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="p-0 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Team Collaboration</CardTitle>
                <CardDescription>
                  Share insights with your team and assign mentions for
                  follow-up.
                </CardDescription>
              </CardHeader>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  +12 team members
                </span>
              </div>
            </Card>

            {/* Brand Protection */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Brand Protection</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground">
                  Monitor brand sentiment and respond before issues escalate.
                </p>
              </CardContent>
            </Card>

            {/* Automation */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Automation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground">
                  Set it and forget it. Our system works 24/7 to keep you
                  informed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by 10,000+ Businesses
          </h2>
          <p className="text-muted-foreground mb-12">
            From startups to enterprises, see what our customers say
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "SocialPing helped us catch a viral mention of our product
                  before it exploded. We were able to engage with the community
                  and turn it into our biggest marketing win."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Sarah Chen</div>
                    <div className="text-xs text-muted-foreground">
                      CEO, TechStart
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "The real-time alerts are game-changing. We can now respond to
                  customer feedback within minutes instead of days. Our response
                  rate improved by 300%."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Marcus Johnson</div>
                    <div className="text-xs text-muted-foreground">
                      Marketing Director, GrowthCo
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "As a content creator, SocialPing helps me track mentions
                  across all platforms. I never miss when someone shares my
                  content or talks about my brand."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Alex Rivera</div>
                    <div className="text-xs text-muted-foreground">
                      Content Creator
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your monitoring needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="relative p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-3xl font-bold">
                  $0
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <CardDescription>
                  Perfect for trying out SocialPing
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">1 keyword</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">12-hour delay</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Dashboard only</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/sign-up">Start Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-primary p-6">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-3xl font-bold">
                  $9
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <CardDescription>
                  Ideal for creators and small businesses
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">5 keywords</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Real-time alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Email notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/sign-up">Choose Pro</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold">
                  $19
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <CardDescription>For agencies and large brands</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Unlimited keywords</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Team access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Platform filters</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/sign-up">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Monitor Your Online Presence?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of businesses already using SocialPing to stay
              ahead of the conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="px-8 py-6 text-lg">
                <Link href="/sign-up">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 text-lg"
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SocialPing</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Monitor your online presence with confidence. Never miss an
                important mention again.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="hover:text-foreground transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-in"
                    className="hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 SocialPing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
