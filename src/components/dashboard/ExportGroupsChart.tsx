import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Package, TrendingUp, Globe, BarChart3, Truck, Ship } from "lucide-react";

export function ExportGroupsChart() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("12months");

  // Export data by product groups
  const exportData = [
    {
      month: "T1/2024",
      electronics: 8.2,
      textiles: 6.8,
      agriculture: 4.3,
      machinery: 5.1,
      total: 24.4
    },
    {
      month: "T2/2024", 
      electronics: 8.8,
      textiles: 7.2,
      agriculture: 4.1,
      machinery: 5.4,
      total: 25.5
    },
    {
      month: "T3/2024",
      electronics: 9.1,
      textiles: 7.0,
      agriculture: 4.5,
      machinery: 5.8,
      total: 26.4
    },
    {
      month: "T4/2024",
      electronics: 9.5,
      textiles: 7.3,
      agriculture: 4.7,
      machinery: 6.0,
      total: 27.5
    },
    {
      month: "T5/2024",
      electronics: 9.8,
      textiles: 7.1,
      agriculture: 4.9,
      machinery: 6.2,
      total: 28.0
    },
    {
      month: "T6/2024",
      electronics: 10.2,
      textiles: 7.4,
      agriculture: 5.1,
      machinery: 6.4,
      total: 29.1
    },
    {
      month: "T7/2024",
      electronics: 10.6,
      textiles: 7.6,
      agriculture: 5.3,
      machinery: 6.7,
      total: 30.2
    },
    {
      month: "T8/2024",
      electronics: 10.9,
      textiles: 7.8,
      agriculture: 5.5,
      machinery: 6.9,
      total: 31.1
    },
    {
      month: "T9/2024",
      electronics: 11.3,
      textiles: 8.0,
      agriculture: 5.7,
      machinery: 7.2,
      total: 32.2
    },
    {
      month: "T10/2024",
      electronics: 11.7,
      textiles: 8.2,
      agriculture: 5.9,
      machinery: 7.4,
      total: 33.2
    },
    {
      month: "T11/2024",
      electronics: 12.1,
      textiles: 8.4,
      agriculture: 6.1,
      machinery: 7.7,
      total: 34.3
    },
    {
      month: "T12/2024",
      electronics: 12.5,
      textiles: 8.6,
      agriculture: 6.3,
      machinery: 8.0,
      total: 35.4
    }
  ];

  // Summary statistics
  const summaryStats = [
    {
      category: "Điện tử",
      value: 125.4,
      growth: 8.7,
      share: 35.4,
      color: "#3b82f6",
      icon: Package
    },
    {
      category: "Dệt may",
      value: 91.8,
      growth: 5.2,
      share: 25.9,
      color: "#8b5cf6",
      icon: Package
    },
    {
      category: "Nông sản",
      value: 63.5,
      growth: 3.8,
      share: 17.9,
      color: "#22c55e", 
      icon: Package
    },
    {
      category: "Máy móc",
      value: 73.2,
      growth: 6.4,
      share: 20.8,
      color: "#f59e0b",
      icon: Package
    }
  ];

  const totalExport = summaryStats.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="card-premium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Ship className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold gradient-text">
                Xuất khẩu theo nhóm hàng
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Phân tích xuất khẩu các nhóm sản phẩm chính
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 tháng</SelectItem>
                <SelectItem value="6months">6 tháng</SelectItem>
                <SelectItem value="12months">12 tháng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryStats.map((stat, index) => (
            <motion.div
              key={stat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: stat.color + '20' }}
                    >
                      <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <AnimatedCounter
                          end={stat.value}
                          className="text-lg font-bold"
                          prefix="$"
                          suffix="B"
                          decimals={1}
                        />
                        <Badge 
                          variant={stat.growth >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {stat.growth >= 0 ? "+" : ""}{stat.growth}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stat.share}% tổng xuất khẩu
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart Tabs */}
        <Tabs defaultValue="trend" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trend">Xu hướng</TabsTrigger>
            <TabsTrigger value="composition">Cơ cấu</TabsTrigger>
            <TabsTrigger value="growth">Tăng trưởng</TabsTrigger>
          </TabsList>

          <TabsContent value="trend">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Xu hướng xuất khẩu theo thời gian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={exportData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      className="text-xs"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `$${value}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
                      }}
                      formatter={(value: any, name) => [`$${value}B`, name]}
                    />
                    <Legend />
                    <Bar dataKey="electronics" fill="hsl(var(--chart-1))" name="Điện tử" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="textiles" fill="hsl(var(--chart-2))" name="Dệt may" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="agriculture" fill="hsl(var(--chart-3))" name="Nông sản" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="machinery" fill="hsl(var(--chart-4))" name="Máy móc" radius={[4, 4, 0, 0]} />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--chart-5))" 
                      strokeWidth={4}
                      name="Tổng cộng"
                      dot={{ fill: 'hsl(var(--chart-5))', strokeWidth: 3, r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composition">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Cơ cấu xuất khẩu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={exportData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      className="text-xs"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `$${value}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
                      }}
                      formatter={(value: any, name) => [`$${value}B`, name]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="electronics"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.8}
                      name="Điện tử"
                    />
                    <Area
                      type="monotone"
                      dataKey="textiles"
                      stackId="1"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.8}
                      name="Dệt may"
                    />
                    <Area
                      type="monotone"
                      dataKey="agriculture"
                      stackId="1"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.8}
                      name="Nông sản"
                    />
                    <Area
                      type="monotone"
                      dataKey="machinery"
                      stackId="1"
                      stroke="hsl(var(--chart-4))"
                      fill="hsl(var(--chart-4))"
                      fillOpacity={0.8}
                      name="Máy móc"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tăng trưởng theo ngành</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {summaryStats.map((stat, index) => (
                      <div key={stat.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: stat.color }}
                          />
                          <span className="text-sm font-medium">{stat.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">
                            {stat.growth >= 0 ? "+" : ""}{stat.growth}%
                          </span>
                          <Badge 
                            variant={stat.growth >= 0 ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {stat.growth >= 6 ? "Cao" : stat.growth >= 3 ? "Trung bình" : "Thấp"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê tổng quan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Tổng xuất khẩu</span>
                      </div>
                      <span className="text-lg font-bold">
                        <AnimatedCounter
                          end={totalExport}
                          prefix="$"
                          suffix="B"
                          decimals={1}
                        />
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/5 to-transparent rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium">Tăng trưởng TB</span>
                      </div>
                      <span className="text-lg font-bold text-green-500">+6.0%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/5 to-transparent rounded-lg">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium">Số thị trường</span>
                      </div>
                      <span className="text-lg font-bold text-blue-500">187</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}