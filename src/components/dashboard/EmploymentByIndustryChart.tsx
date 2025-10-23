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

interface EmploymentData {
  industry: string;
  employment: number;
  growth: number;
  avgSalary: number;
  openJobs: number;
  color: string;
  trend: "up" | "down" | "stable";
}

export function EmploymentByIndustryChart() {
  const { t } = useLanguage();
  const [selectedView, setSelectedView] = useState("bar");
  const [selectedMetric, setSelectedMetric] = useState("employment");
  const [animationKey, setAnimationKey] = useState(0);

  // Generate realistic employment data with variations
  const generateData = (): EmploymentData[] => {
    const industries = [
      { name: "Công nghệ thông tin", base: { employment: 2.8, growth: 15.2, avgSalary: 18.5, openJobs: 45000 }, color: "#3B82F6" },
      { name: "Sản xuất và chế tạo", base: { employment: 16.8, growth: 4.2, avgSalary: 8.2, openJobs: 12000 }, color: "#10B981" },
      { name: "Dịch vụ tài chính", base: { employment: 3.5, growth: 8.7, avgSalary: 15.3, openJobs: 8500 }, color: "#F59E0B" },
      { name: "Nông nghiệp", base: { employment: 25.3, growth: -2.1, avgSalary: 5.8, openJobs: 3200 }, color: "#84CC16" },
      { name: "Thương mại - Dịch vụ", base: { employment: 18.2, growth: 6.8, avgSalary: 7.5, openJobs: 28000 }, color: "#8B5CF6" },
      { name: "Y tế và Dược phẩm", base: { employment: 4.2, growth: 12.1, avgSalary: 12.8, openJobs: 15000 }, color: "#EF4444" },
      { name: "Giáo dục và Đào tạo", base: { employment: 6.8, growth: 3.5, avgSalary: 9.2, openJobs: 7800 }, color: "#06B6D4" },
      { name: "Xây dựng", base: { employment: 8.5, growth: 5.9, avgSalary: 7.8, openJobs: 18000 }, color: "#F97316" },
      { name: "Logistics và Vận tải", base: { employment: 5.2, growth: 9.3, avgSalary: 8.9, openJobs: 22000 }, color: "#EC4899" },
      { name: "Du lịch và Khách sạn", base: { employment: 4.1, growth: 7.8, avgSalary: 6.5, openJobs: 12000 }, color: "#14B8A6" },
    ];

    return industries.map((industry) => {
      const variation = () => 0.95 + Math.random() * 0.1;
      
      return {
        industry: industry.name,
        employment: industry.base.employment * variation(),
        growth: industry.base.growth * variation(),
        avgSalary: industry.base.avgSalary * variation(),
        openJobs: industry.base.openJobs * variation(),
        color: industry.color,
        trend: industry.base.growth > 5 ? "up" : industry.base.growth < 0 ? "down" : "stable"
      };
    });
  };

  const [data, setData] = useState<EmploymentData[]>(generateData());

  // Auto refresh data every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
      setAnimationKey(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-4 rounded-lg shadow-elegant"
        >
          <h3 className="font-bold text-primary mb-2">{data.industry}</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span>Lao động:</span>
              <AnimatedCounter end={data.employment} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Tăng trưởng:</span>
              <AnimatedCounter end={data.growth} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Lương TB:</span>
              <AnimatedCounter end={data.avgSalary} decimals={1} suffix=" triệu VNĐ" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Việc làm mở:</span>
              <AnimatedCounter end={data.openJobs} decimals={0} />
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const totalEmployment = data.reduce((sum, item) => sum + item.employment, 0);
  const avgGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;
  const totalJobs = data.reduce((sum, item) => sum + item.openJobs, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="card-premium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Users className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Việc làm theo Ngành
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Phân bố lao động và cơ hội việc làm
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <div className="status-dot active mr-2"></div>
                Live Data
              </Badge>
              <Button variant="outline" size="sm" className="hover:bg-primary/10">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Chế độ xem</label>
                <Select value={selectedView} onValueChange={setSelectedView}>
                  <SelectTrigger className="bg-background/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Biểu đồ cột
                      </div>
                    </SelectItem>
                    <SelectItem value="pie">
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4" />
                        Biểu đồ tròn
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Chỉ số</label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="bg-background/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employment">Tỷ lệ lao động</SelectItem>
                    <SelectItem value="growth">Tăng trưởng</SelectItem>
                    <SelectItem value="avgSalary">Lương trung bình</SelectItem>
                    <SelectItem value="openJobs">Việc làm mở</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chart */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedView}-${selectedMetric}-${animationKey}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="h-96 w-full chart-container"
              >
                <ResponsiveContainer width="100%" height="100%">
                  {selectedView === "bar" ? (
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="industry" 
                        tick={{ fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        dataKey={selectedMetric} 
                        name={
                          selectedMetric === "employment" ? "Tỷ lệ lao động (%)" :
                          selectedMetric === "growth" ? "Tăng trưởng (%)" :
                          selectedMetric === "avgSalary" ? "Lương TB (triệu VNĐ)" :
                          "Việc làm mở"
                        }
                        radius={[4, 4, 0, 0]}
                      >
                        {data.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            className="data-point"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.industry}: ${entry[selectedMetric].toFixed(1)}${
                          selectedMetric === "employment" || selectedMetric === "growth" ? "%" :
                          selectedMetric === "avgSalary" ? "M" : ""
                        }`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey={selectedMetric}
                      >
                        {data.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            className="data-point"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>

            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50"
            >
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-primary/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Tổng lao động</p>
                </div>
                <AnimatedCounter 
                  end={totalEmployment} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-primary"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-success/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <p className="text-sm text-muted-foreground">Tăng trưởng TB</p>
                </div>
                <AnimatedCounter 
                  end={avgGrowth} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-success"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-warning/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-warning" />
                  <p className="text-sm text-muted-foreground">Việc làm mở</p>
                </div>
                <AnimatedCounter 
                  end={totalJobs} 
                  decimals={0}
                  className="text-lg font-bold text-warning"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Factory className="h-4 w-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Số ngành</p>
                </div>
                <AnimatedCounter 
                  end={data.length} 
                  decimals={0}
                  className="text-lg font-bold text-accent"
                />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}