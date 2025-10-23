import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Image, FileSpreadsheet, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ExportDialogProps {
  chartData?: any;
  chartTitle?: string;
  children?: React.ReactNode;
}

export function ExportDialog({ chartData, chartTitle = "Chart", children }: ExportDialogProps) {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string>("");

  const handleExport = async (type: "pdf" | "excel" | "image") => {
    setIsExporting(true);
    setExportType(type);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would implement actual export logic
      switch (type) {
        case "pdf":
          // Implement PDF export
          toast.success(t("export.success") + " - PDF");
          break;
        case "excel":
          // Implement Excel export
          toast.success(t("export.success") + " - Excel");
          break;
        case "image":
          // Implement image export
          toast.success(t("export.success") + " - " + t("export.image"));
          break;
      }
    } catch (error) {
      toast.error(t("export.error"));
    } finally {
      setIsExporting(false);
      setExportType("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("export.title")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("export.title")} - {chartTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleExport("pdf")}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <FileText className="h-6 w-6 text-red-500 mr-3" />
                <CardTitle className="text-sm font-medium">
                  {t("export.pdf")}
                </CardTitle>
                {isExporting && exportType === "pdf" && (
                  <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Xuất báo cáo chi tiết định dạng PDF
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleExport("excel")}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <FileSpreadsheet className="h-6 w-6 text-green-500 mr-3" />
                <CardTitle className="text-sm font-medium">
                  {t("export.excel")}
                </CardTitle>
                {isExporting && exportType === "excel" && (
                  <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Xuất dữ liệu thô định dạng Excel
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleExport("image")}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Image className="h-6 w-6 text-blue-500 mr-3" />
                <CardTitle className="text-sm font-medium">
                  {t("export.image")}
                </CardTitle>
                {isExporting && exportType === "image" && (
                  <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Xuất biểu đồ dạng hình ảnh PNG
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
