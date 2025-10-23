import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Activity, TrendingUp, BarChart3, Zap } from "lucide-react";

interface DataPoint {
  id: string;
  name: string;
  gdp: number;
  employment: number;
  export: number;
  innovation: number;
  x: number;
  y: number;
  z: number;
  color: string;
}

export function Advanced4DChart() {
  const { t } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState("comprehensive");
  const [selectedView, setSelectedView] = useState("bubble");
  const [animationKey, setAnimationKey] = useState(0);

  // Generate realistic data with real-time variations
  const generateData = (): DataPoint[] => {
    const provinces = [
      { name: "Hà Nội", base: { gdp: 850, employment: 95, export: 45, innovation: 88 } },
      { name: "TP.HCM", base: { gdp: 1200, employment: 92, export: 85, innovation: 85 } },
      { name: "Bình Dương", base: { gdp: 680, employment: 88, export: 75, innovation: 78 } },
      { name: "Đồng Nai", base: { gdp: 520, employment: 85, export: 68, innovation: 72 } },
      { name: "Đà Nẵng", base: { gdp: 380, employment: 90, export: 35, innovation: 82 } },
      { name: "Hải Phòng", base: { gdp: 420, employment: 87, export: 55, innovation: 75 } },
      { name: "Cần Thơ", base: { gdp: 280, employment: 82, export: 28, innovation: 70 } },
      { name: "Vĩnh Phúc", base: { gdp: 320, employment: 89, export: 42, innovation: 76 } },
    ];

    const colors = [
      "#3B82F6", "#EF4444", "#10B981", "#F59E0B", 
      "#8B5CF6", "#06B6D4", "#F97316", "#84CC16"
    ];

    return provinces.map((province, index) => {
      // Add real-time variation
      const variation = () => 0.95 + Math.random() * 0.1;
      
      const gdp = province.base.gdp * variation();
      const employment = province.base.employment * variation();
      const exportVal = province.base.export * variation();
      const innovation = province.base.innovation * variation();

      return {
        id: `province-${index}`,
        name: province.name,
        gdp,
        employment,
        export: exportVal,
        innovation,
        x: gdp,
        y: employment,
        z: exportVal * innovation / 100, // Combined metric
        color: colors[index % colors.length]
      };
    });
  };

  const [data, setData] = useState<DataPoint[]>(generateData());

  // Auto refresh data every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
      setAnimationKey(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-4 rounded-lg shadow-elegant"
        >
          <h3 className="font-bold text-primary mb-2">{data.name}</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span>GDP:</span>
              <AnimatedCounter end={data.gdp} decimals={1} suffix=" tỷ VNĐ" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Việc làm:</span>
              <AnimatedCounter end={data.employment} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Xuất khẩu:</span>
              <AnimatedCounter end={data.export} decimals={1} suffix=" tỷ USD" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Đổi mới:</span>
              <AnimatedCounter end={data.innovation} decimals={1} suffix="/100" />
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const metrics = [
    { value: "comprehensive", label: "Chỉ số Tổng hợp", icon: Activity },
    { value: "economic", label: "Kinh tế", icon: TrendingUp },
    { value: "innovation", label: "Đổi mới", icon: Zap },
    { value: "trade", label: "Thương mại", icon: BarChart3 },
  ];

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
                <Activity className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Biểu đồ 4D - Chỉ số Kinh tế Tổng hợp
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Phân tích đa chiều theo thời gian thực
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <div className="status-dot active mr-2"></div>
                Real-time
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
                <label className="text-sm font-medium mb-2 block">Chỉ số hiển thị</label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="bg-background/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.map((metric) => (
                      <SelectItem key={metric.value} value={metric.value}>
                        <div className="flex items-center gap-2">
                          <metric.icon className="h-4 w-4" />
                          {metric.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Chế độ xem</label>
                <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bubble">Bubble</TabsTrigger>
                    <TabsTrigger value="scatter">Scatter</TabsTrigger>
                    <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Chart */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedView}-${animationKey}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="h-96 w-full chart-container"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="GDP" 
                      unit=" tỷ VNĐ"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Việc làm" 
                      unit="%"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <ZAxis 
                      type="number" 
                      dataKey="z" 
                      range={[50, 300]} 
                      name="Chỉ số tổng hợp"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Scatter name="Tỉnh/Thành" data={data} fill="#8884d8">
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="data-point"
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
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
                <p className="text-sm text-muted-foreground">Avg GDP</p>
                <AnimatedCounter 
                  end={data.reduce((acc, d) => acc + d.gdp, 0) / data.length} 
                  decimals={1} 
                  suffix=" tỷ"
                  className="text-lg font-bold text-primary"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-success/10 to-transparent">
                <p className="text-sm text-muted-foreground">Avg Employment</p>
                <AnimatedCounter 
                  end={data.reduce((acc, d) => acc + d.employment, 0) / data.length} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-success"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-warning/10 to-transparent">
                <p className="text-sm text-muted-foreground">Total Export</p>
                <AnimatedCounter 
                  end={data.reduce((acc, d) => acc + d.export, 0)} 
                  decimals={1} 
                  suffix=" tỷ USD"
                  className="text-lg font-bold text-warning"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-transparent">
                <p className="text-sm text-muted-foreground">Innovation Index</p>
                <AnimatedCounter 
                  end={data.reduce((acc, d) => acc + d.innovation, 0) / data.length} 
                  decimals={1} 
                  suffix="/100"
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
