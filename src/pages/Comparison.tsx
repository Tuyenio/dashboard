import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ExportDialog } from "@/components/ui/export-dialog-temp";
import { Plus, X, TrendingUp, TrendingDown, Target, BarChart3, Users, Building2, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, ScatterChart, Scatter, ComposedChart, Area } from "recharts";
import { RealTimeClock } from "@/components/ui/real-time-clock";

const Comparison = () => {
  const { t } = useLanguage();
  const [compareType, setCompareType] = useState<"province" | "industry">("province");
  const [selectedItems, setSelectedItems] = useState<string[]>(["ho-chi-minh", "ha-noi"]);

  const provinceOptions = [
    { value: "ho-chi-minh", label: "🏙️ TP. Hồ Chí Minh" },
    { value: "ha-noi", label: "🏛️ Hà Nội" },
    { value: "da-nang", label: "🌊 Đà Nẵng" },
    { value: "hai-phong", label: "⚓ Hải Phòng" },
    { value: "binh-duong", label: "🏭 Bình Dương" },
    { value: "dong-nai", label: "🌾 Đồng Nai" },
    { value: "can-tho", label: "🚤 Cần Thơ" },
    { value: "vung-tau", label: "🏖️ Vũng Tàu" },
  ];

  const industryOptions = [
    { value: "cong-nghe", label: "🚀 Công nghệ thông tin" },
    { value: "san-xuat", label: "🏭 Sản xuất điện tử" },
    { value: "det-may", label: "👔 Dệt may" },
    { value: "nong-nghiep", label: "🌾 Nông nghiệp công nghệ cao" },
    { value: "du-lich", label: "✈️ Du lịch & Dịch vụ" },
    { value: "logistics", label: "🚛 Logistics & Vận tải" },
  ];

  // Enhanced comprehensive comparison data
  const structureData = [
    { category: "DN hoạt động", hcm: 18082, hn: 15250, dn: 7200, bd: 8900, dng: 4580, ct: 3200 },
    { category: "Lao động (K)", hcm: 427.5, hn: 385.2, dn: 156.8, bd: 189.3, dng: 125.7, ct: 98.4 },
    { category: "Doanh thu (K tỷ)", hcm: 1245.6, hn: 982.3, dn: 456.7, bd: 567.8, dng: 298.5, ct: 234.1 },
    { category: "Xuất khẩu (B USD)", hcm: 12.9, hn: 8.7, dn: 5.2, bd: 6.8, dng: 3.9, ct: 2.1 },
    { category: "FDI (M USD)", hcm: 1575.2, hn: 1234.5, dn: 567.8, bd: 789.3, dng: 456.2, ct: 234.7 },
  ];

  const dynamicsData = [
    { month: "T1", hcm: 4.2, hn: 3.8, dn: 5.1, bd: 4.9, dng: 4.5, ct: 3.2 },
    { month: "T2", hcm: 4.5, hn: 4.1, dn: 5.3, bd: 5.1, dng: 4.7, ct: 3.5 },
    { month: "T3", hcm: 4.8, hn: 4.3, dn: 5.5, bd: 5.3, dng: 4.9, ct: 3.8 },
    { month: "T4", hcm: 5.2, hn: 4.6, dn: 5.8, bd: 5.6, dng: 5.2, ct: 4.1 },
    { month: "T5", hcm: 5.5, hn: 4.9, dn: 6.0, bd: 5.8, dng: 5.4, ct: 4.3 },
    { month: "T6", hcm: 5.8, hn: 5.2, dn: 6.2, bd: 6.1, dng: 5.7, ct: 4.6 },
    { month: "T7", hcm: 6.1, hn: 5.5, dn: 6.5, bd: 6.3, dng: 5.9, ct: 4.8 },
    { month: "T8", hcm: 6.4, hn: 5.8, dn: 6.7, bd: 6.6, dng: 6.2, ct: 5.1 },
    { month: "T9", hcm: 6.7, hn: 6.1, dn: 7.0, bd: 6.8, dng: 6.4, ct: 5.3 },
    { month: "T10", hcm: 7.0, hn: 6.4, dn: 7.2, bd: 7.1, dng: 6.7, ct: 5.6 },
    { month: "T11", hcm: 7.3, hn: 6.7, dn: 7.5, bd: 7.3, dng: 6.9, ct: 5.8 },
    { month: "T12", hcm: 7.6, hn: 7.0, dn: 7.8, bd: 7.6, dng: 7.2, ct: 6.1 },
  ];

  const radarData = [
    { metric: "Tăng trưởng DN", hcm: 85, hn: 78, dn: 82, bd: 88, dng: 75, ct: 68, fullMark: 100 },
    { metric: "Năng suất LD", hcm: 92, hn: 85, dn: 75, bd: 80, dng: 72, ct: 65, fullMark: 100 },
    { metric: "Xuất khẩu", hcm: 88, hn: 72, dn: 65, bd: 78, dng: 70, ct: 58, fullMark: 100 },
    { metric: "Lợi nhuận", hcm: 80, hn: 82, dn: 78, bd: 85, dng: 76, ct: 70, fullMark: 100 },
    { metric: "Đầu tư", hcm: 90, hn: 88, dn: 70, bd: 82, dng: 75, ct: 68, fullMark: 100 },
    { metric: "Đổi mới", hcm: 95, hn: 90, dn: 68, bd: 75, dng: 65, ct: 60, fullMark: 100 },
  ];

  const detailComparisonData = [
    {
      metric: "GDP/Capita (triệu VNĐ)",
      hcm: 178.5, hn: 142.3, dn: 89.7, bd: 124.6, dng: 95.2, ct: 78.9,
      trend_hcm: 8.2, trend_hn: 7.5, trend_dn: 9.1, trend_bd: 8.8, trend_dng: 7.2, trend_ct: 6.5
    },
    {
      metric: "Chỉ số cạnh tranh",
      hcm: 78.5, hn: 82.1, dn: 75.3, bd: 79.8, dng: 72.4, ct: 68.9,
      trend_hcm: 2.1, trend_hn: 3.2, trend_dn: 4.5, trend_bd: 3.8, trend_dng: 2.8, trend_ct: 1.9
    },
    {
      metric: "Tỷ lệ thất nghiệp (%)",
      hcm: 2.1, hn: 1.8, dn: 2.5, bd: 1.9, dng: 2.8, ct: 3.2,
      trend_hcm: -0.3, trend_hn: -0.5, trend_dn: -0.2, trend_bd: -0.4, trend_dng: -0.1, trend_ct: 0.1
    },
    {
      metric: "Thu nhập bình quân (triệu VNĐ/tháng)",
      hcm: 12.8, hn: 11.5, dn: 8.9, bd: 10.2, dng: 7.8, ct: 6.9,
      trend_hcm: 8.5, trend_hn: 7.8, trend_dn: 9.2, trend_bd: 8.9, trend_dng: 7.5, trend_ct: 6.8
    },
    {
      metric: "Chỉ số môi trường",
      hcm: 65.2, hn: 68.9, dn: 78.5, bd: 62.1, dng: 71.8, ct: 82.3,
      trend_hcm: 1.2, trend_hn: 2.1, trend_dn: 3.5, trend_bd: 0.8, trend_dng: 2.8, trend_ct: 4.2
    },
  ];

  const performanceScatter = [
    { x: 178.5, y: 85, name: "TP.HCM", size: 1245 },
    { x: 142.3, y: 78, name: "Hà Nội", size: 982 },
    { x: 124.6, y: 88, name: "Bình Dương", size: 568 },
    { x: 95.2, y: 75, name: "Đồng Nai", size: 299 },
    { x: 89.7, y: 82, name: "Đà Nẵng", size: 157 },
    { x: 78.9, y: 68, name: "Cần Thơ", size: 234 },
  ];

  const addItem = (item: string) => {
    if (!selectedItems.includes(item) && selectedItems.length < 6) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (item: string) => {
    if (selectedItems.length > 2) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    }
  };

  const getItemLabel = (value: string) => {
    const options = compareType === "province" ? provinceOptions : industryOptions;
    return options.find(opt => opt.value === value)?.label || value;
  };

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <AnimatedCounter
                end={entry.value}
                duration={0.5}
                decimals={1}
                className="font-semibold text-foreground"
              />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {t("comparison.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("comparison.subtitle")} • Cập nhật: Tháng 10/2025
            </p>
          </div>
          <div className="text-5xl animate-bounce">⚖️</div>
        </div>
      </div>

      {/* Selection Controls */}
      <Card className="border-2 border-dashed border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            {t("comparison.select")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comparison Type Toggle */}
          <div className="flex gap-4">
            <Button
              variant={compareType === "province" ? "default" : "outline"}
              onClick={() => setCompareType("province")}
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              So sánh Tỉnh/Thành
            </Button>
            <Button
              variant={compareType === "industry" ? "default" : "outline"}
              onClick={() => setCompareType("industry")}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              So sánh Ngành
            </Button>
          </div>

          {/* Selected Items */}
          <div className="space-y-4">
            <h3 className="font-semibold">Đã chọn ({selectedItems.length}/6):</h3>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((item, index) => (
                <Badge key={item} variant="secondary" className="text-sm py-2 px-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  {getItemLabel(item)}
                  {selectedItems.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item)}
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))}
            </div>

            {/* Add New Item */}
            {selectedItems.length < 6 && (
              <div className="flex items-center gap-4">
                <Select onValueChange={addItem}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder={`Thêm ${compareType === "province" ? "tỉnh/thành" : "ngành"}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(compareType === "province" ? provinceOptions : industryOptions)
                      .filter(opt => !selectedItems.includes(opt.value))
                      .map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  Có thể chọn tối đa 6 {compareType === "province" ? "tỉnh/thành" : "ngành"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Structure Comparison */}
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
        <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{t("comparison.structure")}</CardTitle>
            <ExportDialog chartTitle="So sánh Cấu trúc" chartData={structureData} />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={structureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {selectedItems.slice(0, 6).map((item, index) => (
                <Bar
                  key={item}
                  dataKey={item === "ho-chi-minh" ? "hcm" :
                          item === "ha-noi" ? "hn" :
                          item === "da-nang" ? "dn" :
                          item === "binh-duong" ? "bd" :
                          item === "dong-nai" ? "dng" : "ct"}
                  fill={COLORS[index]}
                  name={getItemLabel(item)}
                  radius={[2, 2, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Charts Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Dynamics Chart */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">{t("comparison.dynamics")}</CardTitle>
              <ExportDialog chartTitle="Động học So sánh" chartData={dynamicsData} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dynamicsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedItems.slice(0, 6).map((item, index) => (
                  <Line
                    key={item}
                    type="monotone"
                    dataKey={item === "ho-chi-minh" ? "hcm" :
                            item === "ha-noi" ? "hn" :
                            item === "da-nang" ? "dn" :
                            item === "binh-duong" ? "bd" :
                            item === "dong-nai" ? "dng" : "ct"}
                    stroke={COLORS[index]}
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    name={getItemLabel(item)}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Comparison */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">{t("comparison.multi_criteria")}</CardTitle>
              <ExportDialog chartTitle="Phân tích Đa tiêu chí" chartData={radarData} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                {selectedItems.slice(0, 3).map((item, index) => (
                  <Radar
                    key={item}
                    name={getItemLabel(item)}
                    dataKey={item === "ho-chi-minh" ? "hcm" :
                            item === "ha-noi" ? "hn" :
                            item === "da-nang" ? "dn" :
                            item === "binh-duong" ? "bd" :
                            item === "dong-nai" ? "dng" : "ct"}
                    stroke={COLORS[index]}
                    fill={COLORS[index]}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Scatter & Detailed Table */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Performance Scatter */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Hiệu suất - GDP</CardTitle>
              <ExportDialog chartTitle="Scatter Performance" chartData={performanceScatter} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart data={performanceScatter}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis
                  dataKey="x"
                  name="GDP/Capita"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'GDP/Capita (triệu VNĐ)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  dataKey="y"
                  name="Performance Score"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Điểm hiệu suất', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl">
                          <p className="font-semibold text-foreground">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            GDP/Capita: <AnimatedCounter end={data.x} decimals={1} suffix=" triệu VNĐ" />
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Điểm hiệu suất: <AnimatedCounter end={data.y} decimals={0} suffix="/100" />
                          </p>
                          <p className="text-sm text-muted-foreground">
                            GDP: <AnimatedCounter end={data.size} decimals={0} suffix=" nghìn tỷ VNĐ" />
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter dataKey="size" fill="#3b82f6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Comparison Table */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
            <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">{t("comparison.detail_table")}</CardTitle>
                <ExportDialog chartTitle="Bảng So sánh Chi tiết" chartData={detailComparisonData} />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-muted/50">
                      <TableHead className="font-semibold w-48">{t("comparison.metric")}</TableHead>
                      {selectedItems.map((item, index) => (
                        <TableHead key={item} className="text-center font-semibold">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            {getItemLabel(item).replace(/[🏙️🏛️🌊⚓🏭🌾🚤🏖️]/g, '')}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailComparisonData.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-foreground bg-muted/20">
                          {row.metric}
                        </TableCell>
                        {selectedItems.map((item, index) => {
                          const value = row[item === "ho-chi-minh" ? "hcm" as keyof typeof row :
                                          item === "ha-noi" ? "hn" as keyof typeof row :
                                          item === "da-nang" ? "dn" as keyof typeof row :
                                          item === "binh-duong" ? "bd" as keyof typeof row :
                                          item === "dong-nai" ? "dng" as keyof typeof row : "ct" as keyof typeof row] as number;
                          const trend = row[`trend_${item === "ho-chi-minh" ? "hcm" : 
                                             item === "ha-noi" ? "hn" : 
                                             item === "da-nang" ? "dn" :
                                             item === "binh-duong" ? "bd" :
                                             item === "dong-nai" ? "dng" : "ct"}` as keyof typeof row] as number;

                          return (
                            <TableCell key={item} className="text-center">
                              <div className="space-y-1">
                                <div className="font-semibold text-lg">
                                  <AnimatedCounter
                                    end={value}
                                    decimals={row.metric.includes('%') ? 1 : row.metric.includes('triệu') ? 1 : 0}
                                    className="text-foreground"
                                  />
                                </div>
                                <div className={`text-xs flex items-center justify-center gap-1 ${
                                  trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                  {trend > 0 ? <TrendingUp className="h-3 w-3" /> :
                                   trend < 0 ? <TrendingDown className="h-3 w-3" /> :
                                   <span className="h-3 w-3">→</span>}
                                  <AnimatedCounter end={Math.abs(trend)} decimals={1} suffix="%" />
                                </div>
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Thông tin So sánh Tổng hợp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={selectedItems.length} />
              </div>
              <div className="text-sm text-muted-foreground">
                {compareType === "province" ? "Tỉnh/Thành" : "Ngành"} được so sánh
              </div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={detailComparisonData.length} />
              </div>
              <div className="text-sm text-muted-foreground">Chỉ số phân tích</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-primary mb-2">
                <AnimatedCounter end={12} />
              </div>
              <div className="text-sm text-muted-foreground">Tháng dữ liệu</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comparison;
