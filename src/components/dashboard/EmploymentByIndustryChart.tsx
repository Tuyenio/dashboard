import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Users, Factory, Briefcase, TrendingUp, BarChart3 } from "lucide-react";

export function EmploymentByIndustryChart() {
  const { t } = useLanguage();
  const [viewType, setViewType] = useState<"percentage" | "absolute">("percentage");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Sample employment data by industry
  const employmentData = [
    {
      industry: "Nông nghiệp",
      employees2023: 15.8,
      employees2024: 15.2,
      percentage2023: 32.5,
      percentage2024: 30.8,
      growth: -3.8,
      color: "#22c55e"
    },
    {
      industry: "Công nghiệp",
      employees2023: 13.2,
      employees2024: 13.8,
      percentage2023: 27.2,
      percentage2024: 28.0,
      growth: 4.5,
      color: "#3b82f6"
    },
    {
      industry: "Dịch vụ",
      employees2023: 19.6,
      employees2024: 20.3,
      percentage2023: 40.3,
      percentage2024: 41.2,
      growth: 3.6,
      color: "#f59e0b"
    }
  ];

  const chartData = employmentData.map(item => ({
    name: item.industry,
    value: viewType === "percentage" 
      ? (selectedYear === "2024" ? item.percentage2024 : item.percentage2023)
      : (selectedYear === "2024" ? item.employees2024 : item.employees2023),
    growth: item.growth,
    color: item.color
  }));

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];

  const totalEmployees = employmentData.reduce((sum, item) => 
    sum + (selectedYear === "2024" ? item.employees2024 : item.employees2023), 0);

  return (
    <Card className="card-premium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Users className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold gradient-text">
                Việc làm theo ngành
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Phân bố lao động qua các ngành kinh tế
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={viewType} onValueChange={(value: "percentage" | "absolute") => setViewType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Phần trăm</SelectItem>
                <SelectItem value="absolute">Tuyệt đối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {employmentData.map((item, index) => (
            <motion.div
              key={item.industry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.industry}
                      </p>
                      <div className="flex items-center gap-2">
                        <AnimatedCounter
                          end={viewType === "percentage" 
                            ? (selectedYear === "2024" ? item.percentage2024 : item.percentage2023)
                            : (selectedYear === "2024" ? item.employees2024 : item.employees2023)
                          }
                          className="text-lg font-bold"
                          suffix={viewType === "percentage" ? "%" : "M"}
                          decimals={1}
                        />
                        <Badge 
                          variant={item.growth >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {item.growth >= 0 ? "+" : ""}{item.growth}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Biểu đồ cột
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs"
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => 
                      viewType === "percentage" ? `${value}%` : `${value}M`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
                    }}
                    formatter={(value: any, name) => [
                      viewType === "percentage" 
                        ? `${value}%` 
                        : `${value} triệu người`,
                      name === "value" ? "Số lượng" : name
                    ]}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#premiumGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Factory className="h-5 w-5" />
                Biểu đồ tròn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => 
                      `${name}: ${viewType === "percentage" ? `${value}%` : `${value}M`}`
                    }
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`hsl(var(--chart-${index + 1}))`}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
                    }}
                    formatter={(value: any) => [
                      viewType === "percentage" 
                        ? `${value}%` 
                        : `${value} triệu người`,
                      "Số lượng"
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Tổng lao động năm {selectedYear}</p>
              <p className="text-lg font-bold">
                <AnimatedCounter
                  end={totalEmployees}
                  suffix=" triệu người"
                  decimals={1}
                />
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}