import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { 
  FileText, Upload, Download, Settings, Database, 
  Plus, Save, Trash2, Edit3, Eye, Filter,
  BarChart3, PieChart, LineChart, TrendingUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function Reports() {
  const { t } = useLanguage();
  const [selectedDataType, setSelectedDataType] = useState("gdp");
  const [isUploading, setIsUploading] = useState(false);

  const dataTypes = [
    { value: "gdp", label: "GDP Data", icon: TrendingUp, count: 150 },
    { value: "employment", label: "Employment", icon: BarChart3, count: 85 },
    { value: "export", label: "Export Data", icon: PieChart, count: 220 },
    { value: "industry", label: "Industry", icon: LineChart, count: 95 }
  ];

  const recentReports = [
    { 
      id: 1, 
      name: "GDP Q3 2024 Report", 
      type: "GDP", 
      date: "2024-10-15", 
      status: "completed",
      size: "2.5 MB"
    },
    { 
      id: 2, 
      name: "Employment Analysis", 
      type: "Employment", 
      date: "2024-10-10", 
      status: "processing",
      size: "1.8 MB"
    },
    { 
      id: 3, 
      name: "Export Performance", 
      type: "Export", 
      date: "2024-10-08", 
      status: "completed",
      size: "3.2 MB"
    }
  ];

  const handleFileUpload = async () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="card-premium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <FileText className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold">
                  Báo cáo & Quản lý Dữ liệu
                </CardTitle>
                <CardDescription>
                  Tạo báo cáo, nhập/xuất dữ liệu và cài đặt hệ thống
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="animate-pulse">
                <div className="status-dot active mr-2"></div>
                Data Active
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          <TabsTrigger value="data-import">Nhập dữ liệu</TabsTrigger>
          <TabsTrigger value="data-export">Xuất dữ liệu</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Report */}
            <div className="lg:col-span-2">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Tạo báo cáo mới
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reportName">Tên báo cáo</Label>
                      <Input 
                        id="reportName" 
                        placeholder="VD: Báo cáo GDP Q4 2024"
                        className="bg-background/80"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportType">Loại báo cáo</Label>
                      <Select>
                        <SelectTrigger className="bg-background/80">
                          <SelectValue placeholder="Chọn loại báo cáo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gdp">Báo cáo GDP</SelectItem>
                          <SelectItem value="employment">Báo cáo Việc làm</SelectItem>
                          <SelectItem value="export">Báo cáo Xuất khẩu</SelectItem>
                          <SelectItem value="comprehensive">Báo cáo Tổng hợp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="reportDesc">Mô tả</Label>
                    <Textarea 
                      id="reportDesc"
                      placeholder="Mô tả nội dung báo cáo..."
                      className="bg-background/80 min-h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateFrom">Từ ngày</Label>
                      <Input 
                        id="dateFrom" 
                        type="date" 
                        className="bg-background/80"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateTo">Đến ngày</Label>
                      <Input 
                        id="dateTo" 
                        type="date" 
                        className="bg-background/80"
                      />
                    </div>
                  </div>

                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Tạo báo cáo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Báo cáo gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{report.type}</span>
                        <span>{report.size}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" variant="outline" className="h-7">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7">
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Import Tab */}
        <TabsContent value="data-import">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Nhập dữ liệu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dataType">Loại dữ liệu</Label>
                  <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                    <SelectTrigger className="bg-background/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dataTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Kéo thả file hoặc click để chọn
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hỗ trợ: CSV, Excel, JSON (Max: 10MB)
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleFileUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "Đang tải..." : "Chọn file"}
                  </Button>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Đang tải lên...</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Thống kê dữ liệu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {dataTypes.map((type) => (
                    <motion.div
                      key={type.value}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-lg bg-muted/30 text-center"
                    >
                      <type.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{type.label}</p>
                      <AnimatedCounter 
                        end={type.count} 
                        className="text-lg font-bold text-primary"
                        suffix=" records"
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Export Tab */}
        <TabsContent value="data-export">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Xuất dữ liệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Chọn dữ liệu xuất</Label>
                    <div className="space-y-2 mt-2">
                      {dataTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <input type="checkbox" id={`export-${type.value}`} className="rounded" />
                          <label htmlFor={`export-${type.value}`} className="text-sm font-medium">
                            {type.label} ({type.count} records)
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="exportFormat">Định dạng</Label>
                    <Select>
                      <SelectTrigger className="bg-background/80">
                        <SelectValue placeholder="Chọn định dạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Xuất dữ liệu
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Lịch sử xuất</h4>
                  <div className="space-y-2">
                    {[
                      { name: "GDP_Export_2024.xlsx", date: "2024-10-20", size: "2.1 MB" },
                      { name: "Employment_Data.csv", date: "2024-10-18", size: "856 KB" },
                      { name: "Complete_Report.pdf", date: "2024-10-15", size: "4.5 MB" }
                    ].map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded border border-border/50">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.date} • {file.size}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cài đặt hệ thống
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cập nhật tự động</Label>
                    <p className="text-sm text-muted-foreground">Tự động cập nhật dữ liệu mỗi 5 phút</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Thông báo real-time</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi có dữ liệu mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sao lưu tự động</Label>
                    <p className="text-sm text-muted-foreground">Sao lưu dữ liệu hàng ngày</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label>Múi giờ</Label>
                  <Select>
                    <SelectTrigger className="bg-background/80">
                      <SelectValue placeholder="GMT+7 (Asia/Ho_Chi_Minh)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia/ho_chi_minh">GMT+7 (Asia/Ho_Chi_Minh)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quản lý dữ liệu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-medium text-warning mb-2">Cảnh báo</h4>
                  <p className="text-sm text-muted-foreground">
                    Các thao tác này sẽ ảnh hưởng đến toàn bộ dữ liệu hệ thống
                  </p>
                </div>

                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Làm sạch dữ liệu trùng lặp
                </Button>

                <Button variant="outline" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Tối ưu hóa cơ sở dữ liệu
                </Button>

                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa dữ liệu cũ (&gt;1 năm)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}