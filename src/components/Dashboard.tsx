import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Smartphone, Banknote } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Dashboard = () => {
  const monthlyStats = {
    totalSpent: 2850,
    budget: 3500,
    savings: 650,
    percentSpent: 81,
  };

  const categories = [
    { name: "Food & Dining", amount: 850, color: "#ef4444", icon: "🍽️" },
    { name: "Transportation", amount: 450, color: "#f59e0b", icon: "🚗" },
    { name: "Entertainment", amount: 320, color: "#eab308", icon: "🎬" },
    { name: "Shopping", amount: 680, color: "#3b82f6", icon: "🛍️" },
    { name: "Utilities", amount: 550, color: "#10b981", icon: "⚡" },
  ];

  const pieChartData = categories.map(category => ({
    name: category.name,
    value: category.amount,
    color: category.color,
    icon: category.icon
  }));

  const paymentMethods = [
    { method: "UPI", amount: 1250, icon: Smartphone, percentage: 44 },
    { method: "Card", amount: 980, icon: CreditCard, percentage: 34 },
    { method: "Cash", amount: 620, icon: Banknote, percentage: 22 },
  ];

  const recentTransactions = [
    { description: "Swiggy Order", amount: -45, method: "UPI", time: "2h ago" },
    { description: "Netflix Subscription", amount: -199, method: "Card", time: "1d ago" },
    { description: "Salary Credit", amount: +5000, method: "Bank", time: "3d ago" },
    { description: "Uber Ride", amount: -85, method: "UPI", time: "5d ago" },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-5">💰</div>
          <div className="absolute top-40 right-20 text-4xl opacity-5">🐷</div>
          <div className="absolute bottom-40 left-20 text-5xl opacity-5">💳</div>
          <div className="absolute bottom-20 right-10 text-4xl opacity-5">📊</div>
          <div className="absolute top-60 left-1/2 text-3xl opacity-5">💸</div>
          <div className="absolute bottom-60 right-1/3 text-4xl opacity-5">🏦</div>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Expense Dashboard</h1>
          <p className="text-muted-foreground">Track your monthly spending patterns and financial health</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{monthlyStats.totalSpent}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{monthlyStats.percentSpent}%</div>
              <Progress value={monthlyStats.percentSpent} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month Savings</CardTitle>
              <TrendingDown className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{monthlyStats.savings}</div>
              <p className="text-xs text-muted-foreground">
                +₹{monthlyStats.budget - monthlyStats.totalSpent} remaining
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{monthlyStats.budget}</div>
              <p className="text-xs text-muted-foreground">Set for this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Spending Pie Chart */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>💰</span>
                <span>Monthly Spending Overview</span>
              </CardTitle>
              <CardDescription>Visual breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Spending Categories */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Spending Categories</CardTitle>
              <CardDescription>Detailed breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-muted-foreground">₹{category.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {Math.round((category.amount / monthlyStats.totalSpent) * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>How you spend your money</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                          <Icon size={16} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{method.method}</p>
                          <p className="text-xs text-muted-foreground">₹{method.amount}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{method.percentage}%</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-6 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${transaction.amount > 0 ? 'bg-success' : 'bg-destructive'}`} />
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.method} • {transaction.time}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;