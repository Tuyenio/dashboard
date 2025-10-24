import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExportDialog } from "@/components/ui/export-dialog";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MapPin } from "lucide-react";

interface VietnamHeatMapProps {
  selectedKPI: string;
  onKPIChange: (value: string) => void;
}

interface ProvinceData {
  name: string;
  value: number;
  x: number;
  y: number;
  population?: number;
  gdp?: number;
  growth?: number;
}

export function VietnamHeatMap({ selectedKPI, onKPIChange }: VietnamHeatMapProps) {
  const { t } = useLanguage();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(null);

  const provinces: ProvinceData[] = [
    { name: "Hà Nội", value: 95, x: 48, y: 25, population: 8435700, gdp: 875600, growth: 6.8 },
    { name: "TP.HCM", value: 100, x: 47, y: 75, population: 9240000, gdp: 1245300, growth: 8.2 },
    { name: "Đà Nẵng", value: 78, x: 52, y: 52, population: 1134000, gdp: 156800, growth: 7.1 },
    { name: "Hải Phòng", value: 72, x: 53, y: 28, population: 2103000, gdp: 234500, growth: 6.9 },
    { name: "Cần Thơ", value: 65, x: 45, y: 80, population: 1235000, gdp: 145600, growth: 6.5 },
    { name: "Bình Dương", value: 88, x: 48, y: 72, population: 2426000, gdp: 567800, growth: 9.1 },
    { name: "Đồng Nai", value: 82, x: 51, y: 74, population: 3097000, gdp: 456700, growth: 7.8 },
    { name: "Khánh Hòa", value: 68, x: 56, y: 60, population: 1230000, gdp: 123400, growth: 6.2 },
    { name: "Nghệ An", value: 58, x: 45, y: 42, population: 3329000, gdp: 178900, growth: 5.8 },
    { name: "Thanh Hóa", value: 55, x: 45, y: 35, population: 3689000, gdp: 167800, growth: 5.9 },
    { name: "Bắc Ninh", value: 85, x: 50, y: 26, population: 1368000, gdp: 389400, growth: 8.5 },
    { name: "Vĩnh Phúc", value: 79, x: 47, y: 24, population: 1154000, gdp: 234500, growth: 7.3 },
    { name: "An Giang", value: 52, x: 42, y: 82, population: 2157000, gdp: 89600, growth: 5.2 },
    { name: "Quảng Ninh", value: 76, x: 55, y: 22, population: 1320000, gdp: 198700, growth: 7.0 },
    { name: "Bà Rịa - Vũng Tàu", value: 81, x: 52, y: 76, population: 1148000, gdp: 234500, growth: 7.6 },
  ];

  const getColor = (value: number) => {
    if (value >= 90) return "hsl(var(--chart-1))";
    if (value >= 75) return "hsl(var(--chart-2))";
    if (value >= 60) return "hsl(var(--chart-3))";
    return "hsl(var(--chart-4))";
  };

  const getGradientColor = (value: number) => {
    if (value >= 90) return "from-chart-1/80 to-chart-1/40";
    if (value >= 75) return "from-chart-2/80 to-chart-2/40";
    if (value >= 60) return "from-chart-3/80 to-chart-3/40";
    return "from-chart-4/80 to-chart-4/40";
  };

  const handleProvinceClick = (province: ProvinceData) => {
    setSelectedProvince(province);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="card-premium chart-container overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold gradient-text">
                  {t("overview.heatmap")}
                </CardTitle>
                <CardDescription className="mt-1 text-muted-foreground">
                  Phân bố chỉ số trên toàn quốc - Nhấp vào tỉnh/thành để xem chi tiết
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedKPI} onValueChange={onKPIChange}>
                <SelectTrigger className="w-48 glass-effect border-primary/30 hover:border-primary/50 transition-all duration-300">
                  <SelectValue placeholder="Chọn chỉ số" />
                </SelectTrigger>
                <SelectContent className="glass-effect">
                  <SelectItem value="doanh-nghiep">{t("overview.enterprises")}</SelectItem>
                  <SelectItem value="xuat-khau">{t("overview.export")}</SelectItem>
                  <SelectItem value="lao-dong">{t("overview.employees")}</SelectItem>
                  <SelectItem value="nang-suat">{t("overview.productivity")}</SelectItem>
                </SelectContent>
              </Select>
              <ExportDialog chartTitle={t("overview.heatmap")} chartData={provinces} />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative">
            <motion.div
              className="relative bg-gradient-to-br from-background/50 via-background/80 to-background/50 rounded-xl p-8 border border-border/50 backdrop-blur-sm"
              style={{ height: "600px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                style={{ filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))" }}
              >
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.05"/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>

                <path
                  d="M45,15 Q50,18 55,20 Q58,25 60,35 Q59,40 58,45 Q60,50 58,55 Q60,60 59,65 Q58,70 56,75 Q54,80 50,85 Q45,88 40,85 Q35,82 32,75 Q28,68 30,60 Q28,52 30,45 Q28,38 32,32 Q35,25 40,20 Q42,18 45,15 Z"
                  fill="url(#mapGradient)"
                  stroke="hsl(var(--border))"
                  strokeWidth="1.5"
                />
              </svg>

              <AnimatePresence>
                {provinces.map((province, index) => (
                  <motion.div
                    key={province.name}
                    className="absolute cursor-pointer group z-10"
                    style={{
                      left: `${province.x}%`,
                      top: `${province.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    whileHover={{ scale: 1.3, zIndex: 20 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleProvinceClick(province)}
                    onMouseEnter={() => setHoveredProvince(province)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-white shadow-xl bg-gradient-to-br ${getGradientColor(province.value)} backdrop-blur-sm neon-glow`}
                      style={{
                        boxShadow: `0 4px 12px ${getColor(province.value)}40, 0 0 20px ${getColor(province.value)}20`,
                      }}
                    />

                    <motion.div
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 glass-effect text-foreground text-sm font-medium px-3 py-2 rounded-lg shadow-elegant border border-border/50 whitespace-nowrap backdrop-blur-lg"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProvince?.name === province.name ? 1 : 0,
                        y: hoveredProvince?.name === province.name ? 0 : 10,
                        scale: hoveredProvince?.name === province.name ? 1 : 0.8
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="font-bold gradient-text">{province.name}</div>
                      <div className="text-xs text-primary font-semibold flex items-center gap-1">
                        <AnimatedCounter end={province.value} duration={0.5} suffix="%" />
                        <div
                          className="w-2 h-2 rounded-full animate-neon-pulse"
                          style={{ backgroundColor: getColor(province.value) }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                className="absolute bottom-6 left-6 glass-effect p-5 rounded-xl shadow-elegant border border-border/50 backdrop-blur-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-sm font-bold text-foreground mb-3 gradient-text">Thang Chỉ Số Hiệu Suất</div>
                <div className="space-y-3">
                  {[
                    { range: "90-100%", color: "hsl(var(--chart-1))", label: "Xuất sắc", gradient: "from-chart-1/80 to-chart-1/40" },
                    { range: "75-89%", color: "hsl(var(--chart-2))", label: "Tốt", gradient: "from-chart-2/80 to-chart-2/40" },
                    { range: "60-74%", color: "hsl(var(--chart-3))", label: "Trung bình", gradient: "from-chart-3/80 to-chart-3/40" },
                    { range: "< 60%", color: "hsl(var(--chart-4))", label: "Cần cải thiện", gradient: "from-chart-4/80 to-chart-4/40" },
                  ].map((item) => (
                    <motion.div 
                      key={item.range} 
                      className="flex items-center gap-3 text-sm"
                      whileHover={{ scale: 1.02, x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border border-white/50 shadow-lg bg-gradient-to-br ${item.gradient}`}
                        style={{ 
                          boxShadow: `0 2px 8px ${item.color}30` 
                        }}
                      />
                      <span className="text-muted-foreground font-medium">{item.range}</span>
                      <span className="text-foreground font-semibold">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>

        <Dialog open={!!selectedProvince} onOpenChange={() => setSelectedProvince(null)}>
          <DialogContent className="sm:max-w-lg glass-effect border-primary/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl gradient-text">
                <div
                  className={`w-5 h-5 rounded-full border border-white/50 shadow-lg bg-gradient-to-br ${selectedProvince ? getGradientColor(selectedProvince.value) : 'from-gray-400 to-gray-600'}`}
                  style={{ 
                    boxShadow: selectedProvince ? `0 4px 12px ${getColor(selectedProvince.value)}40` : 'none'
                  }}
                />
                {selectedProvince?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedProvince && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="text-center p-4 glass-effect rounded-xl border border-primary/20 neon-glow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold gradient-text animate-neon-pulse">
                      <AnimatedCounter end={selectedProvince.value} suffix="%" />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Chỉ số hiệu suất</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 glass-effect rounded-xl border border-chart-2/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold text-chart-2">
                      <AnimatedCounter end={(selectedProvince.population || 0) / 1000} decimals={1} suffix="M" />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Dân số</div>
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="text-center p-4 glass-effect rounded-xl border border-chart-3/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold text-chart-3">
                      <AnimatedCounter end={(selectedProvince.gdp || 0) / 1000} decimals={1} suffix="T" />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">GDP (nghìn tỷ VNĐ)</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-4 glass-effect rounded-xl border border-chart-4/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl font-bold text-chart-4">
                      <AnimatedCounter end={selectedProvince.growth || 0} decimals={1} suffix="%" />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Tăng trưởng</div>
                  </motion.div>
                </div>
                
                <motion.div
                  className="p-4 rounded-xl border text-center"
                  style={{
                    backgroundColor: `${getColor(selectedProvince.value)}15`,
                    borderColor: `${getColor(selectedProvince.value)}40`,
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-lg font-bold" style={{ color: getColor(selectedProvince.value) }}>
                    {selectedProvince.value >= 90 ? "🌟 Xuất sắc" : 
                     selectedProvince.value >= 75 ? "👍 Tốt" : 
                     selectedProvince.value >= 60 ? "📊 Trung bình" : "📈 Cần cải thiện"}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Đánh giá tổng thể hiệu suất kinh tế
                  </div>
                </motion.div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  );
}