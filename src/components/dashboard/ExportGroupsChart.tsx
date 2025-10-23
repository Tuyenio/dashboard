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

interface ExportData {
  category: string;
  value2023: number;
  value2024: number;
  growth: number;
  marketShare: number;
  topCountries: string[];
  color: string;
  icon: string;
}

export function ExportGroupsChart() {
  const { t } = useLanguage();
  const [selectedView, setSelectedView] = useState("combined");
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [animationKey, setAnimationKey] = useState(0);

  // Generate realistic export data with variations
  const generateData = (): ExportData[] => {
    const exportCategories = [
      { 
        name: "Điện tử & Viễn thông", 
        base: { value2023: 145.2, value2024: 158.7, growth: 9.3, marketShare: 28.5 },
        topCountries: ["Mỹ", "Trung Quốc", "Nhật Bản"],
        color: "#3B82F6", 
        icon: "📱" 
      },
      { 
        name: "Dệt may & Giày dép", 
        base: { value2023: 89.4, value2024: 94.1, growth: 5.3, marketShare: 17.2 },
        topCountries: ["EU", "Mỹ", "Hàn Quốc"],
        color: "#10B981", 
        icon: "👔" 
      },
      { 
        name: "Máy móc & Thiết bị", 
        base: { value2023: 67.8, value2024: 75.3, growth: 11.1, marketShare: 13.8 },
        topCountries: ["Trung Quốc", "Thái Lan", "Malaysia"],
        color: "#F59E0B", 
        icon: "⚙️" 
      },
      { 
        name: "Nông sản & Thực phẩm", 
        base: { value2023: 45.6, value2024: 49.8, growth: 9.2, marketShare: 9.1 },
        topCountries: ["Trung Quốc", "Nhật Bản", "Hàn Quốc"],
        color: "#84CC16", 
        icon: "🌾" 
      },
      { 
        name: "Gỗ & Sản phẩm gỗ", 
        base: { value2023: 34.2, value2024: 36.8, growth: 7.6, marketShare: 6.7 },
        topCountries: ["Mỹ", "Nhật Bản", "Trung Quốc"],
        color: "#8B5CF6", 
        icon: "🪑" 
      },
      { 
        name: "Thủy sản", 
        base: { value2023: 28.9, value2024: 31.4, growth: 8.7, marketShare: 5.7 },
        topCountries: ["Mỹ", "EU", "Nhật Bản"],
        color: "#06B6D4", 
        icon: "🐟" 
      },
      { 
        name: "Hóa chất & Phân bón", 
        base: { value2023: 23.5, value2024: 26.1, growth: 11.1, marketShare: 4.8 },
        topCountries: ["Trung Quốc", "Ấn Độ", "Thái Lan"],
        color: "#EF4444", 
        icon: "🧪" 
      },
      { 
        name: "Dầu khí & Khoáng sản", 
        base: { value2023: 19.7, value2024: 22.3, growth: 13.2, marketShare: 4.1 },
        topCountries: ["Singapore", "Malaysia", "Thái Lan"],
        color: "#F97316", 
        icon: "⛽" 
      },
      { 
        name: "Ô tô & Phụ tùng", 
        base: { value2023: 15.3, value2024: 18.9, growth: 23.5, marketShare: 3.4 },
        topCountries: ["Thái Lan", "Indonesia", "Philippines"],
        color: "#EC4899", 
        icon: "🚗" 
      },
      { 
        name: "Khác", 
        base: { value2023: 42.1, value2024: 44.7, growth: 6.2, marketShare: 8.1 },
        topCountries: ["Nhiều nước"],
        color: "#64748B", 
        icon: "📦" 
      },
    ];

    return exportCategories.map((category) => {
      const variation = () => 0.95 + Math.random() * 0.1;
      
      return {
        category: category.name,
        value2023: category.base.value2023 * variation(),
        value2024: category.base.value2024 * variation(),
        growth: category.base.growth * variation(),
        marketShare: category.base.marketShare * variation(),
        topCountries: category.topCountries,
        color: category.color,
        icon: category.icon
      };
    });
  };

  const [data, setData] = useState<ExportData[]>(generateData());

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
          className="glass-effect p-4 rounded-lg shadow-elegant max-w-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{data.icon}</span>
            <h3 className="font-bold text-primary">{data.category}</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span>2023:</span>
              <AnimatedCounter end={data.value2023} decimals={1} suffix=" tỷ USD" />
            </div>
            <div className="flex justify-between gap-4">
              <span>2024:</span>
              <AnimatedCounter end={data.value2024} decimals={1} suffix=" tỷ USD" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Tăng trưởng:</span>
              <AnimatedCounter end={data.growth} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Thị phần:</span>
              <AnimatedCounter end={data.marketShare} decimals={1} suffix="%" />
            </div>
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">Thị trường chính:</p>
              <p className="text-xs font-medium">{data.topCountries.join(", ")}</p>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const totalExport2024 = data.reduce((sum, item) => sum + item.value2024, 0);
  const totalExport2023 = data.reduce((sum, item) => sum + item.value2023, 0);
  const overallGrowth = ((totalExport2024 - totalExport2023) / totalExport2023) * 100;
  const avgGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;

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
                <Package className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Nhóm hàng Xuất khẩu
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Phân tích kim ngạch xuất khẩu theo nhóm sản phẩm
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <div className="status-dot active mr-2"></div>
                Real-time
              </Badge>
              <Button variant="outline" size="sm" className="hover:bg-primary/10">
                <Globe className="h-4 w-4 mr-2" />
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
                <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="combined">Kết hợp</TabsTrigger>
                    <TabsTrigger value="bar">Cột</TabsTrigger>
                    <TabsTrigger value="area">Vùng</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Kỳ báo cáo</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="bg-background/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">Theo năm</SelectItem>
                    <SelectItem value="quarterly">Theo quý</SelectItem>
                    <SelectItem value="monthly">Theo tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chart */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedView}-${selectedPeriod}-${animationKey}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="h-96 w-full chart-container"
              >
                <ResponsiveContainer width="100%" height="100%">
                  {selectedView === "combined" ? (
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="value2024" 
                        name="Kim ngạch 2024 (tỷ USD)"
                        fill="#3B82F6"
                        radius={[2, 2, 0, 0]}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="growth" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        name="Tăng trưởng (%)"
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      />
                    </ComposedChart>
                  ) : selectedView === "bar" ? (
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        dataKey="value2023" 
                        name="2023"
                        fill="#94A3B8"
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar 
                        dataKey="value2024" 
                        name="2024"
                        fill="#3B82F6"
                        radius={[2, 2, 0, 0]}
                      />
                    </ComposedChart>
                  ) : (
                    <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorValue2024" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorValue2023" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="value2023" 
                        stroke="#94A3B8" 
                        fill="url(#colorValue2023)"
                        name="2023"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value2024" 
                        stroke="#3B82F6" 
                        fill="url(#colorValue2024)"
                        name="2024"
                      />
                    </AreaChart>
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
                  <Ship className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Tổng XK 2024</p>
                </div>
                <AnimatedCounter 
                  end={totalExport2024} 
                  decimals={1} 
                  suffix=" tỷ USD"
                  className="text-lg font-bold text-primary"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-success/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <p className="text-sm text-muted-foreground">Tăng trưởng</p>
                </div>
                <AnimatedCounter 
                  end={overallGrowth} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-success"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-warning/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-warning" />
                  <p className="text-sm text-muted-foreground">TB tăng trưởng</p>
                </div>
                <AnimatedCounter 
                  end={avgGrowth} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-warning"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Nhóm hàng</p>
                </div>
                <AnimatedCounter 
                  end={data.length} 
                  decimals={0}
                  className="text-lg font-bold text-accent"
                />
              </div>
            </motion.div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50"
            >
              <div className="space-y-2">
                <h4 className="font-semibold text-success flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Top tăng trưởng
                </h4>
                {data
                  .sort((a, b) => b.growth - a.growth)
                  .slice(0, 3)
                  .map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded bg-success/10"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium">{item.category}</span>
                      </div>
                      <Badge variant="outline" className="bg-success/20 text-success">
                        +<AnimatedCounter end={item.growth} decimals={1} suffix="%" />
                      </Badge>
                    </motion.div>
                  ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Top kim ngạch
                </h4>
                {data
                  .sort((a, b) => b.value2024 - a.value2024)
                  .slice(0, 3)
                  .map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded bg-primary/10"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium">{item.category}</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/20 text-primary">
                        <AnimatedCounter end={item.value2024} decimals={1} suffix="B USD" />
                      </Badge>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}