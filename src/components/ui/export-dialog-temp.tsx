import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileText, Image, FileSpreadsheet, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

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
      alert(`${t("export.success")} - ${type.toUpperCase()}`);
    } catch (error) {
      alert(t("export.error"));
    } finally {
      setIsExporting(false);
      setExportType("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Download className="h-4 w-4 mr-2" />
            {t("export.title")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t("export.title")} - {chartTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary/50"
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

          <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary/50"
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

          <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary/50"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
