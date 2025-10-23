import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KPICard } from "@/components/dashboard/KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ExportDialog } from "@/components/ui/export-dialog-temp";
import { Building2, TrendingUp, Users, DollarSign, MapPin, Factory, Briefcase, Globe, Target, TrendingDown } from "lucide-react";
import { RealTimeClock } from "@/components/ui/real-time-clock";

const Regional = () => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState("ho-chi-minh");

  // Comprehensive regional data
  const industryStructure = [
    { name: "Công nghệ", value: 35.2, color: "#3b82f6", companies: 4850, revenue: 125.6 },
    { name: "Sản xuất", value: 28.4, color: "#10b981", companies: 3920, revenue: 98.7 },
    { name: "Dịch vụ", value: 20.1, color: "#f59e0b", companies: 2780, revenue: 76.3 },
    { name: "Thương mại", value: 12.8, color: "#ef4444", companies: 1850, revenue: 45.2 },
    { name: "Logistics", value: 3.5, color: "#8b5cf6", companies: 890, revenue: 28.9 },
  ];

  const businessTrend = [
    { month: "T1", moi: 450, rut: 120, hd: 12800, von: 850.5, employment: 325000 },
    { month: "T2", moi: 480, rut: 130, hd: 13150, von: 920.3, employment: 328500 },
    { month: "T3", moi: 520, rut: 125, hd: 13545, von: 985.7, employment: 332200 },
    { month: "T4", moi: 490, rut: 140, hd: 13895, von: 1025.4, employment: 335800 },
    { month: "T5", moi: 550, rut: 135, hd: 14310, von: 1085.9, employment: 339500 },
    { month: "T6", moi: 580, rut: 128, hd: 14762, von: 1152.3, employment: 343200 },
    { month: "T7", moi: 620, rut: 142, hd: 15240, von: 1218.7, employment: 347100 },
    { month: "T8", moi: 645, rut: 138, hd: 15747, von: 1285.4, employment: 351000 },
    { month: "T9", moi: 680, rut: 145, hd: 16282, von: 1354.8, employment: 355200 },
    { month: "T10", moi: 720, rut: 152, hd: 16850, von: 1426.3, employment: 359800 },
    { month: "T11", moi: 750, rut: 148, hd: 17452, von: 1498.9, employment: 364500 },
    { month: "T12", moi: 785, rut: 155, hd: 18082, von: 1575.2, employment: 369400 },
  ];

  const employmentData = [
    { sector: "CN Thông tin", count: 125.8, growth: 12.5, salary: 28.5, trend: "🚀" },
    { sector: "Sản xuất", count: 98.3, growth: 8.7, salary: 18.2, trend: "🏭" },
    { sector: "Dịch vụ", count: 87.2, growth: 15.2, salary: 22.4, trend: "🛍️" },
    { sector: "Thương mại", count: 65.7, growth: 6.8, salary: 16.8, trend: "💼" },
    { sector: "Logistics", count: 52.4, growth: 18.9, salary: 19.7, trend: "🚛" },
    { sector: "Du lịch", count: 45.1, growth: 22.3, salary: 15.6, trend: "✈️" },
    { sector: "Tài chính", count: 38.9, growth: 9.4, salary: 35.2, trend: "🏦" },
    { sector: "Giáo dục", count: 32.5, growth: 5.1, salary: 14.8, trend: "📚" },
  ];

  const tradeData = [
    { month: "T1", xk: 8.5, nk: 7.2, balance: 1.3 },
    { month: "T2", xk: 8.8, nk: 7.5, balance: 1.3 },
    { month: "T3", xk: 9.2, nk: 7.8, balance: 1.4 },
    { month: "T4", xk: 9.5, nk: 8.0, balance: 1.5 },
    { month: "T5", xk: 9.8, nk: 8.2, balance: 1.6 },
    { month: "T6", xk: 10.2, nk: 8.5, balance: 1.7 },
    { month: "T7", xk: 10.6, nk: 8.8, balance: 1.8 },
    { month: "T8", xk: 11.1, nk: 9.2, balance: 1.9 },
    { month: "T9", xk: 11.5, nk: 9.5, balance: 2.0 },
    { month: "T10", xk: 12.0, nk: 9.8, balance: 2.2 },
    { month: "T11", xk: 12.4, nk: 10.1, balance: 2.3 },
    { month: "T12", xk: 12.9, nk: 10.5, balance: 2.4 },
  ];

  const performanceMetrics = [
    { metric: "GDP/Capita", value: 8750, fullMark: 12000 },
    { metric: "Innovation Index", value: 75, fullMark: 100 },
    { metric: "Infrastructure", value: 82, fullMark: 100 },
    { metric: "Education", value: 78, fullMark: 100 },
    { metric: "Healthcare", value: 71, fullMark: 100 },
    { metric: "Environment", value: 65, fullMark: 100 },
  ];

  const provinceComparison = [
    { province: "TP.HCM", gdp: 125.6, population: 9.2, companies: 18500, score: 95 },
    { province: "Hà Nội", gdp: 98.4, population: 8.4, companies: 15200, score: 88 },
    { province: "Bình Dương", gdp: 45.7, population: 2.4, companies: 8900, score: 82 },
    { province: "Đồng Nai", gdp: 38.2, population: 3.1, companies: 7200, score: 76 },
    { province: "Đà Nẵng", gdp: 28.9, population: 1.1, companies: 4800, score: 74 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#84cc16"];

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
                decimals={entry.dataKey?.includes('balance') ? 1 : 0}
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
              {t("regional.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("regional.subtitle")} • Cập nhật: Tháng 10/2025
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl animate-pulse">🏙️</div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-64 bg-background border-2 hover:border-primary/30 transition-colors">
                <SelectValue placeholder="Chọn tỉnh/thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ho-chi-minh">🏙️ TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="ha-noi">🏛️ Hà Nội</SelectItem>
                <SelectItem value="da-nang">🌊 Đà Nẵng</SelectItem>
                <SelectItem value="binh-duong">🏭 Bình Dương</SelectItem>
                <SelectItem value="dong-nai">🌾 Đồng Nai</SelectItem>
                <SelectItem value="hai-phong">⚓ Hải Phòng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          {t("regional.summary")} - TP. Hồ Chí Minh
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="GDP"
            value={125.6}
            change={8.2}
            changeType="increase"
            unit="nghìn tỷ VNĐ"
            icon={<DollarSign className="h-5 w-5" />}
            decimals={1}
          />
          <KPICard
            title="Dân số"
            value={9.24}
            change={1.8}
            changeType="increase"
            unit="triệu người"
            icon={<Users className="h-5 w-5" />}
            decimals={2}
          />
          <KPICard
            title="Doanh nghiệp"
            value={18082}
            change={12.5}
            changeType="increase"
            unit="DN hoạt động"
            icon={<Building2 className="h-5 w-5" />}
          />
          <KPICard
            title="FDI"
            value={1575.2}
            change={15.7}
            changeType="increase"
            unit="triệu USD"
            icon={<Globe className="h-5 w-5" />}
            decimals={1}
          />
        </div>
      </div>

      {/* Main Analysis Charts */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Industry Structure */}
        <div>
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20 h-fit">
            <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">{t("regional.industry_structure")}</CardTitle>
                <ExportDialog chartTitle="Cấu trúc Ngành" chartData={industryStructure} />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={industryStructure}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {industryStructure.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-3">
                {industryStructure.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        <AnimatedCounter end={item.value} decimals={1} suffix="%" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <AnimatedCounter end={item.companies} /> DN
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Trends */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
            <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">{t("regional.business_trends")}</CardTitle>
                  <CardDescription>Xu hướng thành lập và rút lui doanh nghiệp</CardDescription>
                </div>
                <ExportDialog chartTitle="Xu hướng Doanh nghiệp" chartData={businessTrend} />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={businessTrend}>
                  <defs>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="moi"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorNew)"
                    name="DN mới thành lập"
                  />
                  <Area
                    type="monotone"
                    dataKey="rut"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#colorClosed)"
                    name="DN rút lui"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Employment & Trade Analysis */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Employment by Sector */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">{t("regional.employment")}</CardTitle>
              <ExportDialog chartTitle="Việc làm theo Ngành" chartData={employmentData} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={employmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="sector" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-2">
              {employmentData.slice(0, 4).map((item, index) => (
                <div key={item.sector} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.trend}</span>
                    <div>
                      <div className="font-medium">{item.sector}</div>
                      <div className="text-xs text-muted-foreground">
                        Lương TB: <AnimatedCounter end={item.salary} decimals={1} suffix=" triệu VNĐ" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      <AnimatedCounter end={item.count} decimals={1} suffix="K" />
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      +<AnimatedCounter end={item.growth} decimals={1} suffix="%" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* International Trade */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">{t("regional.trade")}</CardTitle>
              <ExportDialog chartTitle="Thương mại Quốc tế" chartData={tradeData} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={tradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="xk"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  name="Xuất khẩu (tỷ USD)"
                />
                <Line
                  type="monotone"
                  dataKey="nk"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  name="Nhập khẩu (tỷ USD)"
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 6 }}
                  name="Cán cân thương mại (tỷ USD)"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Trade Summary */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="text-2xl font-bold text-emerald-600">
                  <AnimatedCounter end={12.9} decimals={1} suffix="B" />
                </div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300">Xuất khẩu</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-2xl font-bold text-red-600">
                  <AnimatedCounter end={10.5} decimals={1} suffix="B" />
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">Nhập khẩu</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter end={2.4} decimals={1} suffix="B" />
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Cán cân</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Radar & Province Comparison */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Performance Radar Chart */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Đánh giá Toàn diện</CardTitle>
              <ExportDialog chartTitle="Radar Performance" chartData={performanceMetrics} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Radar
                  name="TP.HCM"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {performanceMetrics.map((item, index) => (
                <div key={item.metric} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <span className="text-sm font-bold text-primary">
                    <AnimatedCounter end={item.value} decimals={item.metric === "GDP/Capita" ? 0 : 0} suffix={item.metric === "GDP/Capita" ? "" : "/100"} />
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Province Comparison */}
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
          <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">{t("regional.productivity_comparison")}</CardTitle>
              <ExportDialog chartTitle="So sánh Tỉnh/Thành" chartData={provinceComparison} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={provinceComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="province" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gdp" fill="#3b82f6" radius={[4, 4, 0, 0]} name="GDP (nghìn tỷ VNĐ)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {provinceComparison.map((item, index) => (
                <div key={item.province} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{item.province}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      <AnimatedCounter end={item.gdp} decimals={1} suffix="K tỷ" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <AnimatedCounter end={item.companies} /> DN
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Regional;
