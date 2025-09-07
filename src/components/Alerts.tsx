import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  CreditCard, 
  ShoppingCart, 
  Tv,
  Coffee,
  Car,
  Smartphone,
  X,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Alerts = () => {
  const [alertSettings, setAlertSettings] = useState({
    spendingLimits: true,
    subscriptionReminders: true,
    budgetWarnings: true,
    investmentUpdates: false,
    dailySpendingSummary: true,
  });

  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "High Food Delivery Spending",
      message: "You've ordered food delivery 4 times this week. Consider cooking at home to save money.",
      icon: ShoppingCart,
      time: "2 hours ago",
      action: "View Details",
      severity: "medium",
    },
    {
      id: 2,
      type: "subscription",
      title: "Unused Netflix Subscription",
      message: "You haven't used Netflix in 30 days but still paying $15.99/month. Consider canceling.",
      icon: Tv,
      time: "1 day ago",
      action: "Cancel Subscription",
      severity: "high",
    },
    {
      id: 3,
      type: "budget",
      title: "Budget Limit Approaching",
      message: "You've spent 85% of your monthly dining budget. $45 remaining.",
      icon: AlertTriangle,
      time: "3 hours ago",
      action: "Adjust Budget",
      severity: "medium",
    },
    {
      id: 4,
      type: "opportunity",
      title: "Cashback Opportunity",
      message: "Earn 5% cashback on groceries this month with your Chase Freedom card.",
      icon: CreditCard,
      time: "5 hours ago",
      action: "Learn More",
      severity: "low",
    },
  ]);

  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const { toast } = useToast();

  const alertCategories = [
    {
      name: "Spending Patterns",
      description: "Get notified about unusual spending habits",
      examples: ["Frequent food delivery", "Multiple coffee purchases", "Large transactions"],
      icon: ShoppingCart,
      setting: "spendingLimits",
    },
    {
      name: "Subscriptions & Recurring",
      description: "Track unused subscriptions and renewals",
      examples: ["Unused streaming services", "Gym memberships", "Software subscriptions"],
      icon: Tv,
      setting: "subscriptionReminders",
    },
    {
      name: "Budget Warnings",
      description: "Stay on track with your monthly budgets",
      examples: ["Category limit reached", "Overspending alerts", "Budget adjustments"],
      icon: AlertTriangle,
      setting: "budgetWarnings",
    },
    {
      name: "Investment Opportunities",
      description: "Don't miss investment and savings opportunities",
      examples: ["Market opportunities", "Portfolio rebalancing", "Cashback offers"],
      icon: TrendingUp,
      setting: "investmentUpdates",
    },
  ];

  const smartInsights = [
    {
      title: "Coffee Spending Pattern",
      insight: "You spend 40% more on coffee on Mondays. Try bringing coffee from home on Mondays to save $12/week.",
      potential_saving: "$624/year",
      icon: Coffee,
    },
    {
      title: "Transportation Optimization", 
      insight: "Your Uber rides cost 60% more than public transit for the same routes. Consider transit passes.",
      potential_saving: "$180/month",
      icon: Car,
    },
    {
      title: "Phone Plan Analysis",
      insight: "You're using only 2GB of your 20GB plan. Switching to a smaller plan could save money.",
      potential_saving: "$25/month",
      icon: Smartphone,
    },
  ];

  const handleAlertSettingChange = (setting: string, value: boolean) => {
    setAlertSettings(prev => ({ ...prev, [setting]: value }));
    toast({
      title: value ? "Alert Enabled" : "Alert Disabled", 
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} alerts have been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const dismissAlert = (alertId: number) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
    toast({
      title: "Alert Dismissed",
      description: "The alert has been dismissed and won't appear again.",
    });
  };

  const handleAlertAction = (alert: any) => {
    toast({
      title: "Action Triggered",
      description: `Opened ${alert.action} for: ${alert.title}`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-4 border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-4 border-l-warning bg-warning/5";
      case "low":
        return "border-l-4 border-l-success bg-success/5";
      default:
        return "border-l-4 border-l-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-5xl opacity-5">🚨</div>
          <div className="absolute top-40 right-16 text-4xl opacity-5">💰</div>
          <div className="absolute bottom-40 left-16 text-4xl opacity-5">📊</div>
          <div className="absolute bottom-20 right-10 text-5xl opacity-5">🐷</div>
          <div className="absolute top-60 left-1/3 text-3xl opacity-5">💳</div>
          <div className="absolute bottom-60 right-1/4 text-4xl opacity-5">🏦</div>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Smart Spending Alerts</h1>
          <p className="text-muted-foreground">Get intelligent notifications about your spending patterns and financial opportunities</p>
        </div>

        {/* Active Alerts */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Active Alerts</span>
              <Badge variant="secondary">{activeAlerts.filter(alert => !dismissedAlerts.includes(alert.id)).length}</Badge>
            </CardTitle>
            <CardDescription>Recent notifications about your spending habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts
                .filter(alert => !dismissedAlerts.includes(alert.id))
                .map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <div key={alert.id} className={`p-4 rounded-lg ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                            <Icon size={20} className="text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Clock size={12} />
                              <span>{alert.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAlertAction(alert)}
                          >
                            {alert.action}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {activeAlerts.filter(alert => !dismissedAlerts.includes(alert.id)).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle size={48} className="mx-auto mb-4 text-success" />
                  <p>All caught up! No new alerts.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alert Settings */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
              <CardDescription>Customize which notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {alertCategories.map((category, index) => {
                  const Icon = category.icon;
                  const isEnabled = alertSettings[category.setting as keyof typeof alertSettings];
                  return (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Icon size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <Label htmlFor={category.setting} className="text-sm font-medium cursor-pointer">
                            {category.name}
                          </Label>
                          <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {category.examples.map((example, exampleIndex) => (
                              <Badge key={exampleIndex} variant="outline" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Switch
                        id={category.setting}
                        checked={isEnabled}
                        onCheckedChange={(value) => handleAlertSettingChange(category.setting, value)}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Smart Insights */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Smart Insights</CardTitle>
              <CardDescription>AI-powered recommendations to optimize your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {smartInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-2">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{insight.insight}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              Save {insight.potential_saving}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Apply Tip
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;