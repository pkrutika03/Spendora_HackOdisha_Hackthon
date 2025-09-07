import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, TrendingUp, DollarSign, PieChart, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Investment = () => {
  const [connectedApps, setConnectedApps] = useState<string[]>([]);
  const { toast } = useToast();

  const investmentPlatforms = [
    {
      name: "Robinhood",
      description: "Commission-free stock trading",
      category: "Stocks & ETFs",
      rating: 4.8,
      minInvestment: 1,
      features: ["Zero fees", "Fractional shares", "Crypto trading"],
      icon: "📈",
      color: "bg-success",
    },
    {
      name: "Vanguard",
      description: "Low-cost index funds and ETFs", 
      category: "Mutual Funds",
      rating: 4.9,
      minInvestment: 1000,
      features: ["Low expense ratios", "Index funds", "Retirement planning"],
      icon: "⚡",
      color: "bg-primary",
    },
    {
      name: "Coinbase",
      description: "Leading cryptocurrency exchange",
      category: "Cryptocurrency",
      rating: 4.2,
      minInvestment: 10,
      features: ["50+ cryptocurrencies", "Secure wallet", "Dollar-cost averaging"],
      icon: "₿",
      color: "bg-warning",
    },
    {
      name: "Fundrise",
      description: "Real estate investment platform",
      category: "Real Estate",
      rating: 4.5,
      minInvestment: 500,
      features: ["Real estate REITs", "Passive income", "Diversification"],
      icon: "🏢",
      color: "bg-accent",
    },
  ];

  const portfolioAllocation = [
    { category: "Stocks", percentage: 60, amount: 12000, color: "bg-primary" },
    { category: "Bonds", percentage: 25, amount: 5000, color: "bg-success" },
    { category: "Crypto", percentage: 10, amount: 2000, color: "bg-warning" },
    { category: "Real Estate", percentage: 5, amount: 1000, color: "bg-accent" },
  ];

  const connectApp = (appName: string) => {
    if (!connectedApps.includes(appName)) {
      setConnectedApps([...connectedApps, appName]);
      toast({
        title: "Connection Successful!",
        description: `Connected to ${appName}. You can now sync your investment data.`,
      });
    }
  };

  const disconnectApp = (appName: string) => {
    setConnectedApps(connectedApps.filter(app => app !== appName));
    toast({
      title: "Disconnected",
      description: `Disconnected from ${appName}.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-12 text-5xl opacity-5">📈</div>
          <div className="absolute top-40 right-16 text-4xl opacity-5">💰</div>
          <div className="absolute bottom-40 left-20 text-4xl opacity-5">🏦</div>
          <div className="absolute bottom-20 right-12 text-5xl opacity-5">📊</div>
          <div className="absolute top-60 left-1/3 text-3xl opacity-5">💸</div>
          <div className="absolute bottom-60 right-1/4 text-3xl opacity-5">🐷</div>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Investment Hub</h1>
          <p className="text-muted-foreground">Connect with investment platforms and track your portfolio performance</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹20,000</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8.5% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+₹1,700</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">across 4 platforms</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">Moderate</div>
              <p className="text-xs text-muted-foreground">6/10 risk level</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment Platforms */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Available Investment Platforms</CardTitle>
                <CardDescription>Connect to these platforms to sync your investment data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {investmentPlatforms.map((platform, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                            {platform.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">{platform.name}</h3>
                              <Badge variant="outline">{platform.category}</Badge>
                              {connectedApps.includes(platform.name) && (
                                <Badge variant="default" className="bg-success">Connected</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{platform.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                              <span>⭐ {platform.rating}</span>
                              <span>Min: ₹{platform.minInvestment}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {platform.features.map((feature, featureIndex) => (
                                <Badge key={featureIndex} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {connectedApps.includes(platform.name) ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => disconnectApp(platform.name)}
                              >
                                Disconnect
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                              >
                                <ExternalLink size={14} className="mr-1" />
                                View
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => connectApp(platform.name)}
                            >
                              <Zap size={14} className="mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Allocation */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Your investment distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioAllocation.map((allocation, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{allocation.category}</span>
                      <span className="text-muted-foreground">{allocation.percentage}%</span>
                    </div>
                    <Progress value={allocation.percentage} className="h-2 mb-1" />
                    <div className="text-xs text-muted-foreground">₹{allocation.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">Recommendation</p>
                <p className="text-xs text-muted-foreground">
                  Consider rebalancing your portfolio. Your stock allocation is higher than recommended for your risk profile.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Goals */}
        <Card className="mt-6 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Investment Goals</CardTitle>
            <CardDescription>Track your progress towards financial milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">₹50K</div>
                <p className="text-sm text-muted-foreground mb-2">Emergency Fund Goal</p>
                <Progress value={40} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">₹20K / ₹50K (40%)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">₹100K</div>
                <p className="text-sm text-muted-foreground mb-2">Retirement Milestone</p>
                <Progress value={20} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">₹20K / ₹100K (20%)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-2">₹25K</div>
                <p className="text-sm text-muted-foreground mb-2">House Down Payment</p>
                <Progress value={80} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">₹20K / ₹25K (80%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Investment;