import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExportDialog } from "@/components/ui/export-dialog";
import { AnimatedCounter } from "@/components/ui/animated-counter";

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
    if (value >= 90) return "#10b981"; // emerald-500
    if (value >= 75) return "#3b82f6"; // blue-500
    if (value >= 60) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  const getColorIntensity = (value: number) => {
    const intensity = Math.max(0.3, value / 100);
    return intensity;
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
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {t("overview.heatmap")}
              </CardTitle>
              <CardDescription className="mt-1">
                Phân bố chỉ số trên toàn quốc - Nhấp vào tỉnh/thành để xem chi tiết
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedKPI} onValueChange={onKPIChange}>
                <SelectTrigger className="w-48 bg-background border-2 hover:border-primary/30 transition-colors">
                  <SelectValue placeholder="Chọn chỉ số" />
                </SelectTrigger>
                <SelectContent>
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
            {/* Map SVG */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 border-2 border-dashed border-border"
              style={{ height: "500px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Vietnam map outline (simplified) */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
              >
                <defs>
                  <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                    <rect width="4" height="4" fill="transparent"/>
                    <circle cx="2" cy="2" r="0.5" fill="currentColor" opacity="0.1"/>
                  </pattern>
                </defs>

                {/* Simplified Vietnam border */}
                <path
                  d="M45,15 Q55,20 60,35 Q58,45 55,55 Q60,65 58,75 Q50,85 45,90 Q35,85 30,75 Q25,65 28,55 Q25,45 30,35 Q35,25 45,15 Z"
                  fill="url(#mapPattern)"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  className="text-muted-foreground"
                />
              </svg>

              {/* Province points */}
              <AnimatePresence>
                {provinces.map((province, index) => (
                  <motion.div
                    key={province.name}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${province.x}%`,
                      top: `${province.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleProvinceClick(province)}
                    onMouseEnter={() => setHoveredProvince(province)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  >
                    {/* Province circle */}
                    <motion.div
                      className="relative"
                      animate={{
                        scale: hoveredProvince?.name === province.name ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ repeat: hoveredProvince?.name === province.name ? Infinity : 0, duration: 1 }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{
                          backgroundColor: getColor(province.value),
                          opacity: getColorIntensity(province.value),
                        }}
                      />

                      {/* Pulse animation */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: getColor(province.value) }}
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>

                    {/* Province label */}
                    <motion.div
                      className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-md shadow-lg border border-border whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredProvince?.name === province.name ? 1 : 0,
                        y: hoveredProvince?.name === province.name ? 0 : 10
                      }}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div className="font-semibold">{province.name}</div>
                      <div className="text-xs text-muted-foreground">
                        <AnimatedCounter end={province.value} duration={0.5} suffix="%" />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Legend */}
              <motion.div
                className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-sm font-semibold text-foreground mb-2">Chỉ số hiệu suất</div>
                <div className="space-y-2">
                  {[
                    { range: "90-100%", color: "#10b981", label: "Xuất sắc" },
                    { range: "75-89%", color: "#3b82f6", label: "Tốt" },
                    { range: "60-74%", color: "#f59e0b", label: "Trung bình" },
                    { range: "< 60%", color: "#ef4444", label: "Cần cải thiện" },
                  ].map((item) => (
                    <div key={item.range} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.range}</span>
                      <span className="text-foreground font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>

        {/* Province Detail Dialog */}
        <Dialog open={!!selectedProvince} onOpenChange={() => setSelectedProvince(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedProvince ? getColor(selectedProvince.value) : "#gray" }}
                />
                {selectedProvince?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedProvince && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={selectedProvince.value} suffix="%" />
                    </div>
                    <div className="text-sm text-muted-foreground">Chỉ số hiệu suất</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={selectedProvince.population || 0} decimals={1} suffix="K" />
                    </div>
                    <div className="text-sm text-muted-foreground">Dân số (nghìn người)</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={selectedProvince.gdp || 0} decimals={1} suffix="B" />
                    </div>
                    <div className="text-sm text-muted-foreground">GDP (tỷ VNĐ)</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={selectedProvince.growth || 0} decimals={1} suffix="%" />
                    </div>
                    <div className="text-sm text-muted-foreground">Tăng trưởng</div>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  );
}
