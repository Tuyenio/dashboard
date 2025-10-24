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

export function GDPPerformanceChart() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"quarterly" | "yearly">("quarterly");

  // GDP Performance Data
  const quarterlyData = [
    {
      period: "Q1 2023",
      gdp: 3.32,
      gdpNominal: 108.2,
      gdpPerCapita: 4.1,
      inflation: 3.2,
      target: 6.5
    },
    {
      period: "Q2 2023", 
      gdp: 4.14,
      gdpNominal: 112.5,
      gdpPerCapita: 4.2,
      inflation: 2.8,
      target: 6.5
    },
    {
      period: "Q3 2023",
      gdp: 5.33,
      gdpNominal: 118.7,
      gdpPerCapita: 4.4,
      inflation: 3.5,
      target: 6.5
    },
    {
      period: "Q4 2023",
      gdp: 6.72,
      gdpNominal: 125.9,
      gdpPerCapita: 4.6,
      inflation: 3.9,
      target: 6.5
    },
    {
      period: "Q1 2024",
      gdp: 5.66,
      gdpNominal: 132.1,
      gdpPerCapita: 4.7,
      inflation: 4.1,
      target: 6.0
    },
    {
      period: "Q2 2024",
      gdp: 6.42,
      gdpNominal: 139.8,
      gdpPerCapita: 4.9,
      inflation: 3.7,
      target: 6.0
    },
    {
      period: "Q3 2024",
      gdp: 7.40,
      gdpNominal: 148.2,
      gdpPerCapita: 5.1,
      inflation: 3.3,
      target: 6.0
    },
    {
      period: "Q4 2024",
      gdp: 7.09,
      gdpNominal: 155.6,
      gdpPerCapita: 5.3,
      inflation: 3.8,
      target: 6.0
    }
  ];

  const yearlyData = [
    {
      year: "2019",
      gdp: 7.02,
      gdpNominal: 261.9,
      gdpPerCapita: 2.7,
      inflation: 2.8
    },
    {
      year: "2020", 
      gdp: 2.91,
      gdpNominal: 271.2,
      gdpPerCapita: 2.8,
      inflation: 3.2
    },
    {
      year: "2021",
      gdp: 2.58,
      gdpNominal: 362.6,
      gdpPerCapita: 3.7,
      inflation: 1.8
    },
    {
      year: "2022",
      gdp: 8.02,
      gdpNominal: 408.8,
      gdpPerCapita: 4.1,
      inflation: 3.2
    },
    {
      year: "2023",
      gdp: 5.05,
      gdpNominal: 429.1,
      gdpPerCapita: 4.3,
      inflation: 3.3
    },
    {
      year: "2024",
      gdp: 6.64,
      gdpNominal: 475.3,
      gdpPerCapita: 4.7,
      inflation: 3.7
    }
  ];

  // Sector contribution data for radar chart
  const sectorData = [
    {
      sector: "Nông nghiệp",
      contribution: 12.0,
      growth: 3.0,
      fullMark: 15
    },
    {
      sector: "Công nghiệp", 
      contribution: 33.7,
      growth: 7.8,
      fullMark: 40
    },
    {
      sector: "Xây dựng",
      contribution: 5.7,
      growth: 5.5,
      fullMark: 8
    },
    {
      sector: "Dịch vụ",
      contribution: 48.6,
      growth: 6.5,
      fullMark: 55
    }
  ];

  const currentData = viewMode === "quarterly" ? quarterlyData : yearlyData;
  const latestGDP = currentData[currentData.length - 1]?.gdp || 0;
  const latestNominal = currentData[currentData.length - 1]?.gdpNominal || 0;
  const latestPerCapita = currentData[currentData.length - 1]?.gdpPerCapita || 0;

  return (
    <Card className="card-premium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold gradient-text">
                Hiệu quả GDP
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Phân tích chi tiết tăng trưởng kinh tế
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={viewMode} onValueChange={(value: "quarterly" | "yearly") => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quarterly">Theo quý</SelectItem>
                <SelectItem value="yearly">Theo năm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-blue-500/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Tăng trưởng GDP
                    </p>
                    <div className="flex items-center gap-2">
                      <AnimatedCounter
                        end={latestGDP}
                        className="text-lg font-bold"
                        suffix="%"
                        decimals={2}
                      />
                      <Badge variant={latestGDP >= 6 ? "default" : "secondary"}>
                        {latestGDP >= 6 ? "Đạt mục tiêu" : "Dưới mục tiêu"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-green-500/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      GDP Danh nghĩa
                    </p>
                    <AnimatedCounter
                      end={latestNominal}
                      className="text-lg font-bold"
                      prefix="$"
                      suffix="B"
                      decimals={1}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      GDP/người
                    </p>
                    <AnimatedCounter
                      end={latestPerCapita}
                      className="text-lg font-bold"
                      prefix="$"
                      suffix="K"
                      decimals={1}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Chart Tabs */}
        <Tabs defaultValue="trend" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trend">Xu hướng</TabsTrigger>
            <TabsTrigger value="comparison">So sánh</TabsTrigger>
            <TabsTrigger value="sectors">Ngành</TabsTrigger>
          </TabsList>

          <TabsContent value="trend">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 gradient-text">
                  <Activity className="h-5 w-5 text-chart-1" />
                  Xu hướng tăng trưởng GDP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted-foreground/20" />
                    <XAxis 
                      dataKey={viewMode === "quarterly" ? "period" : "year"}
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: any, name) => {
                        if (name === "gdp") return [`${value}%`, "Tăng trưởng GDP"];
                        if (name === "target") return [`${value}%`, "Mục tiêu"];
                        if (name === "inflation") return [`${value}%`, "Lạm phát"];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="gdp" 
                      fill="url(#gdpGradient)"
                      radius={[4, 4, 0, 0]}
                      name="Tăng trưởng GDP"
                    />
                    {viewMode === "quarterly" && (
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Mục tiêu"
                        dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 3 }}
                      />
                    )}
                    <Line 
                      type="monotone" 
                      dataKey="inflation" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2}
                      name="Lạm phát"
                      dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 3 }}
                    />
                    <defs>
                      <linearGradient id="gdpGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 gradient-text">
                  <BarChart3 className="h-5 w-5 text-chart-2" />
                  So sánh các chỉ số kinh tế
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted-foreground/20" />
                    <XAxis 
                      dataKey={viewMode === "quarterly" ? "period" : "year"}
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}B`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: any, name) => {
                        if (name === "gdp") return [`${value}%`, "Tăng trưởng GDP"];
                        if (name === "gdpNominal") return [`$${value}B`, "GDP Danh nghĩa"];
                        if (name === "gdpPerCapita") return [`$${value}K`, "GDP/người"];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="gdp" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={3}
                      name="Tăng trưởng GDP"
                      dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="gdpNominal" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={3}
                      name="GDP Danh nghĩa"
                      dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="gdpPerCapita" 
                      stroke="hsl(var(--chart-3))" 
                      strokeWidth={2}
                      name="GDP/người"
                      dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 gradient-text">
                    <Award className="h-5 w-5 text-chart-4" />
                    Đóng góp theo ngành
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={sectorData}>
                      <defs>
                        <linearGradient id="sectorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <PolarGrid className="stroke-muted-foreground/20" />
                      <PolarAngleAxis dataKey="sector" className="text-xs fill-muted-foreground" />
                      <PolarRadiusAxis 
                        angle={0}
                        domain={[0, 'dataMax']}
                        className="text-xs fill-muted-foreground"
                      />
                      <Radar
                        name="Đóng góp (%)"
                        dataKey="contribution"
                        stroke="hsl(var(--chart-4))"
                        fill="url(#sectorGradient)"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: 'hsl(var(--chart-4))' }}
                      />
                      <Radar
                        name="Tăng trưởng (%)"
                        dataKey="growth"
                        stroke="hsl(var(--chart-5))"
                        fill="hsl(var(--chart-5))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--chart-5))' }}
                      />
                      <Legend />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                          color: 'hsl(var(--foreground))'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Giá trị']}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle className="text-lg gradient-text">Chi tiết theo ngành</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectorData.map((sector, index) => (
                      <div key={sector.sector} className="p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{sector.sector}</span>
                          <Badge variant="outline">
                            {sector.contribution}% GDP
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Tăng trưởng
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            +{sector.growth}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Performance Summary */}
        <motion.div 
          className="mt-6 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg border border-primary/20 neon-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow"
              whileHover={{ scale: 1.05, rotate: 10 }}
            >
              <Target className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">
                Đánh giá hiệu quả kinh tế năm 2024
              </p>
              <p className="text-xl font-bold mt-1">
                GDP tăng trưởng <span className="gradient-text animate-neon-pulse">6.64%</span> - Vượt mục tiêu đề ra
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="default" className="bg-gradient-primary text-primary-foreground">
                  Xuất sắc
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Cao hơn mục tiêu 0.64%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}