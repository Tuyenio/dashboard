import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TrendingUp, DollarSign, BarChart3, Target, Activity, Award } from "lucide-react";

interface GDPData {
  period: string;
  gdpTotal: number;
  gdpPerCapita: number;
  gdpGrowth: number;
  gdpNominal: number;
  gdpPPP: number;
  sectors: {
    agriculture: number;
    industry: number;
    services: number;
  };
  regions: {
    north: number;
    central: number;
    south: number;
  };
  target: number;
  performance: number;
}

interface SectorData {
  sector: string;
  value: number;
  growth: number;
  contribution: number;
  color: string;
  icon: string;
}

export function GDPPerformanceChart() {
  const { t } = useLanguage();
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedMetric, setSelectedMetric] = useState("total");
  const [animationKey, setAnimationKey] = useState(0);

  // Generate realistic GDP data with variations
  const generateData = (): GDPData[] => {
    const baseData = [
      { period: "Q1 2023", base: { gdpTotal: 95.8, gdpPerCapita: 3980, gdpGrowth: 5.2, target: 6.5, performance: 80 } },
      { period: "Q2 2023", base: { gdpTotal: 97.2, gdpPerCapita: 4040, gdpGrowth: 5.8, target: 6.5, performance: 89 } },
      { period: "Q3 2023", base: { gdpTotal: 98.9, gdpPerCapita: 4110, gdpGrowth: 6.1, target: 6.5, performance: 94 } },
      { period: "Q4 2023", base: { gdpTotal: 100.1, gdpPerCapita: 4160, gdpGrowth: 6.4, target: 6.5, performance: 98 } },
      { period: "Q1 2024", base: { gdpTotal: 101.8, gdpPerCapita: 4230, gdpGrowth: 6.7, target: 6.8, performance: 99 } },
      { period: "Q2 2024", base: { gdpTotal: 103.6, gdpPerCapita: 4305, gdpGrowth: 7.1, target: 6.8, performance: 104 } },
      { period: "Q3 2024", base: { gdpTotal: 105.2, gdpPerCapita: 4375, gdpGrowth: 7.3, target: 6.8, performance: 107 } },
      { period: "Q4 2024E", base: { gdpTotal: 106.9, gdpPerCapita: 4445, gdpGrowth: 7.6, target: 6.8, performance: 112 } },
    ];

    return baseData.map((item) => {
      const variation = () => 0.97 + Math.random() * 0.06;
      const sectorVariation = () => 0.95 + Math.random() * 0.1;
      
      return {
        period: item.period,
        gdpTotal: item.base.gdpTotal * variation(),
        gdpPerCapita: item.base.gdpPerCapita * variation(),
        gdpGrowth: item.base.gdpGrowth * variation(),
        gdpNominal: item.base.gdpTotal * variation() * 1000,
        gdpPPP: item.base.gdpTotal * variation() * 1.35,
        target: item.base.target,
        performance: item.base.performance * variation(),
        sectors: {
          agriculture: 12.5 * sectorVariation(),
          industry: 38.2 * sectorVariation(),
          services: 49.3 * sectorVariation(),
        },
        regions: {
          north: 25.8 * sectorVariation(),
          central: 31.5 * sectorVariation(),
          south: 42.7 * sectorVariation(),
        }
      };
    });
  };

  const generateSectorData = (): SectorData[] => {
    const sectors = [
      { 
        name: "Nông nghiệp", 
        base: { value: 12.5, growth: 2.8, contribution: 15.2 },
        color: "#84CC16", 
        icon: "🌾" 
      },
      { 
        name: "Công nghiệp", 
        base: { value: 38.2, growth: 8.3, contribution: 42.8 },
        color: "#3B82F6", 
        icon: "🏭" 
      },
      { 
        name: "Dịch vụ", 
        base: { value: 49.3, growth: 7.1, contribution: 42.0 },
        color: "#10B981", 
        icon: "🏢" 
      },
    ];

    return sectors.map((sector) => {
      const variation = () => 0.95 + Math.random() * 0.1;
      
      return {
        sector: sector.name,
        value: sector.base.value * variation(),
        growth: sector.base.growth * variation(),
        contribution: sector.base.contribution * variation(),
        color: sector.color,
        icon: sector.icon
      };
    });
  };

  const [data, setData] = useState<GDPData[]>(generateData());
  const [sectorData, setSectorData] = useState<SectorData[]>(generateSectorData());

  // Auto refresh data every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
      setSectorData(generateSectorData());
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
          <h3 className="font-bold text-primary mb-2">{label}</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span>GDP Total:</span>
              <AnimatedCounter end={data.gdpTotal} decimals={1} suffix=" nghìn tỷ VND" />
            </div>
            <div className="flex justify-between gap-4">
              <span>GDP/người:</span>
              <AnimatedCounter end={data.gdpPerCapita} decimals={0} prefix="$" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Tăng trưởng:</span>
              <AnimatedCounter end={data.gdpGrowth} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Mục tiêu:</span>
              <AnimatedCounter end={data.target} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Hiệu suất:</span>
              <AnimatedCounter end={data.performance} decimals={0} suffix="%" />
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const SectorTooltip = ({ active, payload, label }: any) => {
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
            <h3 className="font-bold text-primary">{data.sector}</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span>Tỷ trọng:</span>
              <AnimatedCounter end={data.value} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Tăng trưởng:</span>
              <AnimatedCounter end={data.growth} decimals={1} suffix="%" />
            </div>
            <div className="flex justify-between gap-4">
              <span>Đóng góp:</span>
              <AnimatedCounter end={data.contribution} decimals={1} suffix="%" />
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const quarterGrowth = latestData && previousData 
    ? ((latestData.gdpTotal - previousData.gdpTotal) / previousData.gdpTotal) * 100 
    : 0;

  const radarData = [
    { metric: "Tăng trưởng", current: latestData?.gdpGrowth || 0, target: latestData?.target || 0 },
    { metric: "Hiệu suất", current: latestData?.performance || 0, target: 100 },
    { metric: "Nông nghiệp", current: sectorData[0]?.growth || 0, target: 5 },
    { metric: "Công nghiệp", current: sectorData[1]?.growth || 0, target: 10 },
    { metric: "Dịch vụ", current: sectorData[2]?.growth || 0, target: 8 },
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
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Hiệu suất - GDP
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Phân tích hiệu suất tăng trưởng kinh tế quốc gia
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <div className="status-dot active mr-2"></div>
                Real-time
              </Badge>
              <Button variant="outline" size="sm" className="hover:bg-primary/10">
                <BarChart3 className="h-4 w-4 mr-2" />
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
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="sectors">Ngành</TabsTrigger>
                    <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Chỉ số</label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="bg-background/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total">GDP Tổng</SelectItem>
                    <SelectItem value="percapita">GDP/người</SelectItem>
                    <SelectItem value="growth">Tăng trưởng</SelectItem>
                    <SelectItem value="performance">Hiệu suất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Charts */}
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
                  {selectedView === "overview" ? (
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey={
                          selectedMetric === "total" ? "gdpTotal" :
                          selectedMetric === "percapita" ? "gdpPerCapita" :
                          selectedMetric === "growth" ? "gdpGrowth" :
                          "performance"
                        }
                        name={
                          selectedMetric === "total" ? "GDP (nghìn tỷ VND)" :
                          selectedMetric === "percapita" ? "GDP/người ($)" :
                          selectedMetric === "growth" ? "Tăng trưởng (%)" :
                          "Hiệu suất (%)"
                        }
                        fill="#3B82F6"
                        radius={[2, 2, 0, 0]}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="target" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Mục tiêu (%)"
                        dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                      />
                    </ComposedChart>
                  ) : selectedView === "sectors" ? (
                    <ComposedChart data={sectorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="sector" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip content={<SectorTooltip />} />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="value" 
                        name="Tỷ trọng (%)"
                        fill="#8B5CF6"
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
                  ) : (
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis tick={{ fontSize: 10 }} />
                      <Radar 
                        name="Hiện tại" 
                        dataKey="current" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar 
                        name="Mục tiêu" 
                        dataKey="target" 
                        stroke="#F59E0B" 
                        fill="#F59E0B" 
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </RadarChart>
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
                  <DollarSign className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">GDP Hiện tại</p>
                </div>
                <AnimatedCounter 
                  end={latestData?.gdpTotal || 0} 
                  decimals={1} 
                  suffix=" nghìn tỷ"
                  className="text-lg font-bold text-primary"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-success/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <p className="text-sm text-muted-foreground">Tăng trưởng</p>
                </div>
                <AnimatedCounter 
                  end={latestData?.gdpGrowth || 0} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-success"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-warning/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-warning" />
                  <p className="text-sm text-muted-foreground">Mục tiêu</p>
                </div>
                <AnimatedCounter 
                  end={latestData?.target || 0} 
                  decimals={1} 
                  suffix="%"
                  className="text-lg font-bold text-warning"
                />
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-transparent">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Hiệu suất</p>
                </div>
                <AnimatedCounter 
                  end={latestData?.performance || 0} 
                  decimals={0} 
                  suffix="%"
                  className="text-lg font-bold text-accent"
                />
              </div>
            </motion.div>

            {/* Performance Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50"
            >
              <div className="space-y-2">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Top ngành tăng trưởng
                </h4>
                {sectorData
                  .sort((a, b) => b.growth - a.growth)
                  .map((item, index) => (
                    <motion.div
                      key={item.sector}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded bg-primary/10"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium">{item.sector}</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/20 text-primary">
                        +<AnimatedCounter end={item.growth} decimals={1} suffix="%" />
                      </Badge>
                    </motion.div>
                  ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-success flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Xu hướng quý
                </h4>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="p-4 rounded-lg bg-success/10"
                >
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Tăng trưởng quý</p>
                    <AnimatedCounter 
                      end={quarterGrowth} 
                      decimals={1} 
                      suffix="%"
                      className="text-2xl font-bold text-success"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-muted-foreground">
                      {quarterGrowth > 0 ? "📈 Tích cực" : "📉 Cần cải thiện"}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-warning flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Đánh giá mục tiêu
                </h4>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="p-4 rounded-lg bg-warning/10"
                >
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Đạt mục tiêu</p>
                    <AnimatedCounter 
                      end={((latestData?.gdpGrowth || 0) / (latestData?.target || 1)) * 100} 
                      decimals={0} 
                      suffix="%"
                      className="text-2xl font-bold text-warning"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-muted-foreground">
                      {((latestData?.gdpGrowth || 0) >= (latestData?.target || 0)) ? "🎯 Vượt mục tiêu" : "⏳ Cần nỗ lực"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}