import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, ShoppingCart, Heart, Smartphone, CreditCard, Banknote, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const BudgetSplitter = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  const [paymentSplit, setPaymentSplit] = useState({
    upi: 40,
    card: 35,
    cash: 25,
  });

  const { toast } = useToast();

  // 50-30-20 rule: Needs, Wants, Savings
  const budgetSplit = {
    needs: Math.round(monthlyIncome * 0.5),
    wants: Math.round(monthlyIncome * 0.3),
    savings: Math.round(monthlyIncome * 0.2),
  };

  const paymentBreakdown = {
    upi: Math.round(monthlyIncome * (paymentSplit.upi / 100)),
    card: Math.round(monthlyIncome * (paymentSplit.card / 100)),
    cash: Math.round(monthlyIncome * (paymentSplit.cash / 100)),
  };

  const categories = {
    needs: [
      { name: "Rent/Mortgage", percentage: 30, icon: "🏠" },
      { name: "Groceries", percentage: 12, icon: "🛒" },
      { name: "Utilities", percentage: 5, icon: "⚡" },
      { name: "Transportation", percentage: 3, icon: "🚗" },
    ],
    wants: [
      { name: "Dining Out", percentage: 10, icon: "🍽️" },
      { name: "Entertainment", percentage: 8, icon: "🎬" },
      { name: "Shopping", percentage: 7, icon: "🛍️" },
      { name: "Hobbies", percentage: 5, icon: "🎨" },
    ],
  };

  const handlePaymentSplitChange = (method: string, value: number) => {
    const total = Object.entries(paymentSplit)
      .filter(([key]) => key !== method)
      .reduce((sum, [, val]) => sum + val, 0) + value;
    
    if (total <= 100) {
      setPaymentSplit(prev => ({ ...prev, [method]: value }));
    }
  };

  const saveBudget = () => {
    toast({
      title: "Budget Saved Successfully!",
      description: `Your monthly budget of ₹${monthlyIncome} has been split and saved.`,
    });
  };

  const budgetChartData = [
    { name: 'Needs', value: budgetSplit.needs, color: '#10b981', percentage: 50 },
    { name: 'Wants', value: budgetSplit.wants, color: '#3b82f6', percentage: 30 },
    { name: 'Savings', value: budgetSplit.savings, color: '#f59e0b', percentage: 20 },
  ];

  const categoryBreakdownData = [
    ...categories.needs.map(cat => ({ 
      name: cat.name, 
      amount: Math.round(monthlyIncome * (cat.percentage / 100)),
      category: 'Needs',
      color: '#10b981'
    })),
    ...categories.wants.map(cat => ({ 
      name: cat.name, 
      amount: Math.round(monthlyIncome * (cat.percentage / 100)),
      category: 'Wants',
      color: '#3b82f6'
    }))
  ];

  const downloadChart = () => {
    // Create a downloadable image of the budget chart
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Monthly Budget Breakdown', canvas.width / 2, 40);
    
    // Add subtitle
    ctx.font = '16px Arial';
    ctx.fillText(`Total Income: ₹${monthlyIncome}`, canvas.width / 2, 70);
    
    // Draw pie chart sections
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 50;
    const radius = 120;
    let startAngle = 0;
    
    budgetChartData.forEach((item, index) => {
      const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Add labels
      const labelAngle = startAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 40);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 40);
      
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.name, labelX, labelY);
      ctx.fillText(`₹${item.value}`, labelX, labelY + 20);
      ctx.fillText(`${item.percentage}%`, labelX, labelY + 40);
      
      startAngle += sliceAngle;
    });
    
    // Download the image
    const link = document.createElement('a');
    link.download = 'budget-breakdown.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Chart Downloaded!",
      description: "Your budget breakdown chart has been saved as an image.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-8 text-5xl opacity-5">🐷</div>
          <div className="absolute top-32 right-16 text-4xl opacity-5">💰</div>
          <div className="absolute bottom-32 left-16 text-4xl opacity-5">📊</div>
          <div className="absolute bottom-16 right-8 text-5xl opacity-5">💳</div>
          <div className="absolute top-48 left-1/3 text-3xl opacity-5">💸</div>
          <div className="absolute bottom-48 right-1/4 text-3xl opacity-5">🏦</div>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Monthly Budget Splitter</h1>
          <p className="text-muted-foreground">Automatically split your income into Needs, Wants, and Savings using the 50-30-20 rule</p>
        </div>

        {/* Income Input */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Set Your Monthly Income</CardTitle>
            <CardDescription>Enter your total monthly income to automatically calculate budget splits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="income" className="text-sm font-medium min-w-0">Monthly Income:</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg">₹</span>
                <Input
                  id="income"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-32"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="budget-split" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="budget-split">Budget Categories</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="budget-split">
            {/* Budget Visualization Chart */}
            <Card className="mb-8 bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Budget Visualization</span>
                  <Button onClick={downloadChart} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Chart
                  </Button>
                </CardTitle>
                <CardDescription>Visual representation of your 50-30-20 budget split</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {budgetChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryBreakdownData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                        <Bar dataKey="amount" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Budget Split Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-success text-white shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Needs (50%)</CardTitle>
                  <ShoppingCart className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{budgetSplit.needs}</div>
                  <p className="text-xs opacity-90">Essential expenses</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-primary text-white shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wants (30%)</CardTitle>
                  <Heart className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{budgetSplit.wants}</div>
                  <p className="text-xs opacity-90">Lifestyle & fun</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card border-2 border-warning">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-warning">Savings (20%)</CardTitle>
                  <PiggyBank className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">₹{budgetSplit.savings}</div>
                  <p className="text-xs text-muted-foreground">Emergency fund & goals</p>
                </CardContent>
              </Card>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="text-success">Needs Breakdown</CardTitle>
                  <CardDescription>Essential monthly expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.needs.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{category.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ₹{Math.round(monthlyIncome * (category.percentage / 100))}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{category.percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="text-primary">Wants Breakdown</CardTitle>
                  <CardDescription>Lifestyle and entertainment expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.wants.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{category.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ₹{Math.round(monthlyIncome * (category.percentage / 100))}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{category.percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment-methods">
            {/* Payment Method Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">UPI</CardTitle>
                  <Smartphone className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">₹{paymentBreakdown.upi}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      type="number"
                      value={paymentSplit.upi}
                      onChange={(e) => handlePaymentSplitChange('upi', Number(e.target.value))}
                      className="w-20"
                      max={100}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Card</CardTitle>
                  <CreditCard className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">₹{paymentBreakdown.card}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      type="number"
                      value={paymentSplit.card}
                      onChange={(e) => handlePaymentSplitChange('card', Number(e.target.value))}
                      className="w-20"
                      max={100}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cash</CardTitle>
                  <Banknote className="h-5 w-5 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">₹{paymentBreakdown.cash}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      type="number"
                      value={paymentSplit.cash}
                      onChange={(e) => handlePaymentSplitChange('cash', Number(e.target.value))}
                      className="w-20"
                      max={100}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Method Progress */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>Total: {paymentSplit.upi + paymentSplit.card + paymentSplit.cash}% allocated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>UPI Payments</span>
                      <span>{paymentSplit.upi}%</span>
                    </div>
                    <Progress value={paymentSplit.upi} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Card Payments</span>
                      <span>{paymentSplit.card}%</span>
                    </div>
                    <Progress value={paymentSplit.card} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cash Payments</span>
                      <span>{paymentSplit.cash}%</span>
                    </div>
                    <Progress value={paymentSplit.cash} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            onClick={saveBudget}
            size="lg"
            className="bg-gradient-primary text-white hover:shadow-glow transition-all duration-300"
          >
            <PiggyBank className="mr-2" size={20} />
            Save Budget Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetSplitter;