import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ExportDialog } from "@/components/ui/export-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface Performer {
  name: string;
  value: string;
  change: number;
  rank: number;
  trend?: string;
}

interface TopPerformersTableProps {
  title: string;
  type: "increase" | "decrease";
  data: Performer[];
}

export function TopPerformersTable({ title, type, data }: TopPerformersTableProps) {
  const { t } = useLanguage();

  const getGradientClass = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-800";
    return "bg-gradient-to-r from-slate-400 to-slate-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
        <CardHeader className="bg-gradient-to-r from-card to-muted/20 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              {type === "increase" ? (
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ y: [2, -2, 2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <TrendingDown className="h-6 w-6 text-red-500" />
                </motion.div>
              )}
              {title}
            </CardTitle>
            <ExportDialog chartTitle={title} chartData={data} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead className="w-16 text-center font-semibold">#</TableHead>
                  <TableHead className="font-semibold">{t("overview.industry")}</TableHead>
                  <TableHead className="text-right font-semibold">{t("common.value")}</TableHead>
                  <TableHead className="text-right font-semibold">{t("overview.change")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <motion.tr
                    key={item.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group hover:bg-muted/30 transition-all duration-300 border-b border-border/50"
                  >
                    <TableCell className="text-center">
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${getGradientClass(item.rank)}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {item.rank}
                      </motion.div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.trend && (
                          <motion.span
                            className="text-xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                          >
                            {item.trend}
                          </motion.span>
                        )}
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Xếp hạng #{item.rank}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold text-foreground">
                        {item.value}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                      >
                        <Badge
                          variant={type === "increase" ? "default" : "destructive"}
                          className={`font-semibold ${
                            type === "increase"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700"
                              : "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700"
                          }`}
                        >
                          {type === "increase" ? "+" : ""}
                          <AnimatedCounter
                            end={Math.abs(item.change)}
                            duration={1.5}
                            decimals={1}
                            suffix="%"
                          />
                        </Badge>
                      </motion.div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-muted/30 px-6 py-4 border-t border-border"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Tổng số ngành được phân tích: <strong>{data.length}</strong>
              </span>
              <span className="text-muted-foreground">
                Biến động trung bình:
                <strong className={type === "increase" ? "text-emerald-600" : "text-red-600"}>
                  {type === "increase" ? "+" : ""}
                  <AnimatedCounter
                    end={data.reduce((acc, item) => acc + Math.abs(item.change), 0) / data.length}
                    duration={2}
                    decimals={1}
                    suffix="%"
                  />
                </strong>
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
