import { Building2, Users, TrendingUp, Package, DollarSign, ArrowUpDown, BarChart3, PieChart, Factory, Briefcase, Target, Globe } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { TopPerformersTable } from "@/components/dashboard/TopPerformersTable";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { VietnamHeatMap } from "@/components/dashboard/VietnamHeatMap";
import { Advanced4DChart } from "@/components/dashboard/Advanced4DChart";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { RealTimeClock } from "@/components/ui/real-time-clock";

const Overview = () => {
  const { t } = useLanguage();
  const [selectedKPI, setSelectedKPI] = useState("doanh-nghiep");

  // Enhanced sample data with more comprehensive metrics
  const trendData = [
    { month: "T1", value: 245000, previous: 230000, export: 28500, import: 24300, employment: 52340000 },
    { month: "T2", value: 248000, previous: 235000, export: 29200, import: 24800, employment: 52450000 },
    { month: "T3", value: 252000, previous: 238000, export: 30100, import: 25200, employment: 52560000 },
    { month: "T4", value: 255000, previous: 242000, export: 29800, import: 25600, employment: 52680000 },
    { month: "T5", value: 258000, previous: 245000, export: 31200, import: 26100, employment: 52790000 },
    { month: "T6", value: 262000, previous: 250000, export: 32400, import: 26800, employment: 52890000 },
    { month: "T7", value: 265000, previous: 252000, export: 33100, import: 27200, employment: 53000000 },
    { month: "T8", value: 268000, previous: 255000, export: 33800, import: 27600, employment: 53120000 },
    { month: "T9", value: 272000, previous: 260000, export: 34500, import: 28100, employment: 53240000 },
    { month: "T10", value: 275000, previous: 262000, export: 35200, import: 28500, employment: 53360000 },
    { month: "T11", value: 278000, previous: 268000, export: 36100, import: 29000, employment: 53480000 },
    { month: "T12", value: 282000, previous: 270000, export: 37200, import: 29800, employment: 53600000 },
  ];

  // 3D Chart data for advanced visualization
  const chart3DData = [
    { x: 1, y: 1, z: 1, value: 285000, label: "Doanh nghiệp", color: "#3b82f6" },
    { x: 2, y: 2, z: 1, value: 37200, label: "Xuất khẩu", color: "#10b981" },
    { x: 3, y: 1, z: 2, value: 29800, label: "Nhập khẩu", color: "#f59e0b" },
    { x: 1, y: 3, z: 3, value: 53600, label: "Lao động", color: "#8b5cf6" },
    { x: 4, y: 2, z: 2, value: 425000, label: "Năng suất", color: "#ef4444" },
    { x: 2, y: 4, z: 1, value: 156800, label: "Doanh thu", color: "#06b6d4" },
  ];

  const topIncrease = [
    { rank: 1, name: "Công nghệ thông tin", value: "45.2B VNĐ", change: 15.8, trend: "🚀" },
    { rank: 2, name: "Sản xuất điện tử", value: "38.7B VNĐ", change: 12.3, trend: "📱" },
    { rank: 3, name: "Dệt may xuất khẩu", value: "32.5B VNĐ", change: 10.5, trend: "👔" },
    { rank: 4, name: "Nông nghiệp công nghệ cao", value: "28.9B VNĐ", change: 9.8, trend: "🌾" },
    { rank: 5, name: "Logistics & Vận tải", value: "25.3B VNĐ", change: 8.4, trend: "🚛" },
    { rank: 6, name: "Du lịch & Dịch vụ", value: "22.1B VNĐ", change: 7.9, trend: "✈️" },
    { rank: 7, name: "Năng lượng tái tạo", value: "19.8B VNĐ", change: 7.2, trend: "⚡" },
    { rank: 8, name: "Thực phẩm chế biến", value: "18.4B VNĐ", change: 6.8, trend: "🍽️" },
  ];

  const topDecrease = [
    { rank: 1, name: "Khai thác than đá", value: "12.3B VNĐ", change: -8.5, trend: "⛏️" },
    { rank: 2, name: "Dệt truyền thống", value: "15.7B VNĐ", change: -6.2, trend: "🧵" },
    { rank: 3, name: "In ấn & Xuất bản", value: "9.8B VNĐ", change: -5.8, trend: "📰" },
    { rank: 4, name: "Giày dép thủ công", value: "11.2B VNĐ", change: -4.9, trend: "👞" },
    { rank: 5, name: "Đồ gỗ xuất khẩu", value: "18.5B VNĐ", change: -3.7, trend: "🪑" },
    { rank: 6, name: "Thép thô", value: "14.2B VNĐ", change: -3.1, trend: "🏗️" },
  ];

  const alerts = [
    {
      id: "1",
      title: "Xuất khẩu giảm đột ngột",
      description: "Kim ngạch xuất khẩu sang EU giảm 12% trong tháng 12, cần điều tra nguyên nhân và đưa ra biện pháp khắc phục",
      severity: "critical" as const,
      timestamp: "2 giờ trước",
    },
    {
      id: "2",
      title: "Doanh nghiệp công nghệ tăng mạnh",
      description: "Số doanh nghiệp công nghệ mới thành lập tăng 23% so với cùng kỳ năm trước",
      severity: "success" as const,
      timestamp: "4 giờ trước",
    },
    {
      id: "3",
      title: "Thiếu hụt lao động kỹ thuật",
      description: "Nhiều doanh nghiệp sản xuất báo cáo thiếu hụt lao động có kỹ năng chuyên môn cao",
      severity: "warning" as const,
      timestamp: "6 giờ trước",
    },
    {
      id: "4",
      title: "Đầu tư FDI tích cực",
      description: "Vốn đầu tư trực tiếp nước ngoài tăng 18% trong quý 4, chủ yếu vào lĩnh vực công nghệ",
      severity: "success" as const,
      timestamp: "8 giờ trước",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-border"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("overview.title")}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {t("header.updated")} • Cập nhật thời gian thực
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl"
          >
            🌍
          </motion.div>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          {t("overview.kpi.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title={t("overview.enterprises")}
            value={282000}
            change={4.2}
            changeType="increase"
            unit=""
            icon={<Building2 className="h-5 w-5" />}
          />
          <KPICard
            title={t("overview.employees")}
            value={53600000}
            change={2.1}
            changeType="increase"
            unit="người"
            icon={<Users className="h-5 w-5" />}
            decimals={0}
          />
          <KPICard
            title={t("overview.export")}
            value={37.2}
            change={8.7}
            changeType="increase"
            unit="tỷ USD"
            icon={<TrendingUp className="h-5 w-5" />}
            decimals={1}
          />
          <KPICard
            title={t("overview.productivity")}
            value={156.8}
            change={6.3}
            changeType="increase"
            unit="triệu VNĐ/người"
            icon={<BarChart3 className="h-5 w-5" />}
            decimals={1}
          />
        </div>
      </motion.div>

      {/* Additional KPI Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title={t("overview.new_enterprises")}
            value={18500}
            change={12.4}
            changeType="increase"
            unit="DN/tháng"
            icon={<Factory className="h-5 w-5" />}
          />
          <KPICard
            title={t("overview.import")}
            value={29.8}
            change={5.2}
            changeType="increase"
            unit="tỷ USD"
            icon={<Package className="h-5 w-5" />}
            decimals={1}
          />
          <KPICard
            title={t("overview.trade_balance")}
            value={7.4}
            change={15.8}
            changeType="increase"
            unit="tỷ USD"
            icon={<ArrowUpDown className="h-5 w-5" />}
            decimals={1}
          />
          <KPICard
            title={t("overview.revenue")}
            value={1245.6}
            change={7.9}
            changeType="increase"
            unit="nghìn tỷ VNĐ"
            icon={<DollarSign className="h-5 w-5" />}
            decimals={1}
          />
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Trend Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <TrendChart
            title={t("overview.trends")}
            description="Dữ liệu kinh tế chính theo tháng"
            data={trendData}
            dataKey="value"
            color="#3b82f6"
            showArea={true}
            showPrevious={true}
          />
        </motion.div>

        {/* Vietnam Heat Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <VietnamHeatMap
            selectedKPI={selectedKPI}
            onKPIChange={setSelectedKPI}
          />
        </motion.div>
      </div>

      {/* Advanced 4D Chart and Export Chart */}
      <div className="grid gap-8 lg:grid-cols-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Advanced4DChart />
        </motion.div>
      </div>

      {/* Export Import Trend Chart */}
      <div className="grid gap-8 lg:grid-cols-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <TrendChart
            title="Xuất nhập khẩu"
            description="So sánh kim ngạch xuất nhập khẩu"
            data={trendData}
            dataKey="export"
            color="#10b981"
            showArea={false}
            showPrevious={false}
          />
        </motion.div>
      </div>

      {/* Performance Tables */}
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <TopPerformersTable
            title={t("overview.top_increase")}
            data={topIncrease}
            type="increase"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <TopPerformersTable
            title={t("overview.top_decrease")}
            data={topDecrease}
            type="decrease"
          />
        </motion.div>
      </div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          {t("overview.alerts")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 + index * 0.1, duration: 0.4 }}
            >
              <AlertCard {...alert} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
