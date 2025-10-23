import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ExportDialog } from "@/components/ui/export-dialog";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface KPICardProps {
  title: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  unit?: string;
  icon?: React.ReactNode;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeType,
  unit,
  icon,
  decimals = 0,
  prefix = "",
  suffix = ""
}: KPICardProps) {
  const { t } = useLanguage();

  const getTrendIcon = () => {
    if (changeType === "increase") return <TrendingUp className="h-4 w-4" />;
    if (changeType === "decrease") return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (changeType === "increase") return "text-emerald-600 dark:text-emerald-400";
    if (changeType === "decrease") return "text-red-600 dark:text-red-400";
    return "text-gray-500 dark:text-gray-400";
  };

  const getBgColor = () => {
    if (changeType === "increase") return "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800";
    if (changeType === "decrease") return "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800";
    return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {icon && (
              <motion.div
                className="text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {icon}
              </motion.div>
            )}
            <ExportDialog chartTitle={title}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
              >
                📊
              </motion.button>
            </ExportDialog>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            <AnimatedCounter
              end={value}
              duration={2}
              decimals={decimals}
              prefix={prefix}
              suffix={suffix}
              className="text-inherit"
            />
            {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border",
                getBgColor(),
                getTrendColor()
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <motion.div
                animate={{
                  y: changeType === "increase" ? [0, -2, 0] : changeType === "decrease" ? [0, 2, 0] : 0
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                {getTrendIcon()}
              </motion.div>
              <AnimatedCounter
                end={Math.abs(change)}
                duration={1.5}
                decimals={1}
                suffix="%"
                className="text-inherit"
              />
            </motion.div>
            <span className="text-xs text-muted-foreground">
              {t("common.value")} so với tháng trước
            </span>
          </div>

          {/* Progress bar animation */}
          <motion.div
            className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              className={cn(
                "h-full rounded-full",
                changeType === "increase" ? "bg-emerald-500" :
                changeType === "decrease" ? "bg-red-500" : "bg-gray-400"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
