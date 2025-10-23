import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ReferenceLine } from "recharts";
import { motion } from "framer-motion";
import { ExportDialog } from "@/components/ui/export-dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface TrendChartProps {
  title: string;
  description?: string;
  data: Array<{
    month: string;
    value: number;
    previous?: number;
  }>;
  dataKey: string;
  color?: string;
  showArea?: boolean;
  showPrevious?: boolean;
  animated?: boolean;
}

export function TrendChart({ 
  title, 
  description, 
  data, 
  dataKey, 
  color = "hsl(var(--primary))",
  showArea = true,
  showPrevious = true,
  animated = true
}: TrendChartProps) {
  const { t } = useLanguage();
  const [hoveredData, setHoveredData] = useState<any>(null);

  const gradientId = `gradient-${title.replace(/\s+/g, '-')}`;
  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = ((currentValue - previousValue) / previousValue) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      setHoveredData(payload[0].payload);
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl"
        >
          <p className="text-sm font-medium text-foreground mb-2">{`${t("common.month")} ${label}`}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm text-muted-foreground">{t("overview.trends")}:</span>
              <AnimatedCounter 
                end={payload[0].value} 
                duration={0.5}
                decimals={0}
                className="font-semibold text-foreground"
              />
            </div>
            {payload[0].payload.previous && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">Năm trước:</span>
                <AnimatedCounter 
                  end={payload[0].payload.previous} 
                  duration={0.5}
                  decimals={0}
                  className="font-semibold text-muted-foreground"
                />
              </div>
            )}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const ChartComponent = showArea ? AreaChart : LineChart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/20 relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
              </CardTitle>
              {description && <CardDescription className="mt-1">{description}</CardDescription>}
            </div>
            <div className="flex items-center gap-4">
              {/* Live indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">LIVE</span>
              </motion.div>
              
              {/* Current value display */}
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  <AnimatedCounter end={currentValue} duration={2} decimals={0} />
                </div>
                <div className={`text-sm flex items-center gap-1 ${
                  change >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  <span>{change >= 0 ? '↗' : '↘'}</span>
                  <AnimatedCounter end={Math.abs(change)} duration={1} decimals={1} suffix="%" />
                </div>
              </div>
              
              <ExportDialog chartTitle={title} chartData={data} />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <ResponsiveContainer width="100%" height={350}>
            <ChartComponent data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                strokeOpacity={0.3}
              />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {showArea ? (
                <Area 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color}
                  strokeWidth={3}
                  fill={`url(#${gradientId})`}
                  name={t("overview.trends")}
                  filter="url(#glow)"
                  dot={{ r: 0 }}
                  activeDot={{ 
                    r: 8, 
                    stroke: color, 
                    strokeWidth: 3,
                    fill: "#fff",
                    filter: "url(#glow)"
                  }}
                />
              ) : (
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color}
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ 
                    r: 8, 
                    stroke: color, 
                    strokeWidth: 3,
                    fill: "#fff",
                    filter: "url(#glow)"
                  }}
                  name={t("overview.trends")}
                  filter="url(#glow)"
                />
              )}
              
              {showPrevious && (
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                  name="Năm trước"
                />
              )}
              
              {/* Trend line */}
              <ReferenceLine 
                y={currentValue} 
                stroke={color} 
                strokeDasharray="2 2" 
                strokeOpacity={0.5}
              />
            </ChartComponent>
          </ResponsiveContainer>
          
          {/* Chart insights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredData ? 1 : 0 }}
            className="mt-4 p-3 bg-muted/50 rounded-lg border"
          >
            <div className="text-sm text-muted-foreground">
              <strong>Phân tích xu hướng:</strong> {
                change > 5 ? "Tăng trưởng mạnh" :
                change > 0 ? "Tăng trưởng ổn định" :
                change > -5 ? "Giảm nhẹ" : "Giảm mạnh"
              }
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
