import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Factory, TrendingUp, Users, BarChart3 } from "lucide-react";
import { EmploymentByIndustryChart } from "@/components/dashboard/EmploymentByIndustryChart";
import { ExportGroupsChart } from "@/components/dashboard/ExportGroupsChart";
import { GDPPerformanceChart } from "@/components/dashboard/GDPPerformanceChart";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RealTimeClock } from "@/components/ui/real-time-clock";

const Industry = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <Card className="card-premium">
        <CardHeader>
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Factory className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-bold">
                {t("industry.title")}
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                {t("industry.subtitle")} • <RealTimeClock />
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tăng trưởng Sản xuất</p>
                      <AnimatedCounter 
                        end={8.5} 
                        decimals={1} 
                        suffix="%" 
                        className="text-2xl font-bold text-primary"
                      />
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
              <Card className="bg-gradient-to-r from-success/10 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tỷ lệ Việc làm</p>
                      <AnimatedCounter 
                        end={96.2} 
                        decimals={1} 
                        suffix="%" 
                        className="text-2xl font-bold text-success"
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
              <Card className="bg-gradient-to-r from-warning/10 to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sản lượng Công nghiệp</p>
                      <AnimatedCounter 
                        end={12.3} 
                        decimals={1} 
                        suffix="T VND" 
                        className="text-2xl font-bold text-warning"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Employment by Industry Chart */}
      <EmploymentByIndustryChart />

      {/* Export Groups Chart */}
      <ExportGroupsChart />

      {/* GDP Performance Chart */}
      <GDPPerformanceChart />
    </motion.div>
  );
};

export default Industry;
