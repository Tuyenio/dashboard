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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  User, Settings, Bell, Shield, Eye, EyeOff, 
  Camera, Edit3, Save, Lock, Key, Mail, 
  Phone, Building, Calendar, MapPin,
  Activity, BarChart3, Clock, Award
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function Profile() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn Admin",
    email: "admin@gov.vn",
    phone: "+84 123 456 789",
    organization: "Bộ Kế hoạch và Đầu tư",
    position: "Chuyên viên phân tích dữ liệu",
    department: "Phòng Thống kê và Dự báo",
    bio: "Chuyên gia phân tích dữ liệu kinh tế với 8 năm kinh nghiệm trong lĩnh vực thống kê quốc gia.",
    location: "Hà Nội, Việt Nam"
  });

  const userStats = [
    { label: "Báo cáo đã tạo", value: 156, icon: BarChart3, color: "text-primary" },
    { label: "Giờ hoạt động", value: 2840, icon: Clock, color: "text-success" },
    { label: "Dữ liệu xử lý", value: 89, unit: "GB", icon: Activity, color: "text-warning" },
    { label: "Thành tích", value: 24, icon: Award, color: "text-accent" }
  ];

  const recentActivities = [
    { action: "Tạo báo cáo GDP Q3", time: "2 giờ trước", type: "report" },
    { action: "Cập nhật dữ liệu xuất khẩu", time: "4 giờ trước", type: "data" },
    { action: "Xuất báo cáo Excel", time: "1 ngày trước", type: "export" },
    { action: "Đăng nhập hệ thống", time: "2 ngày trước", type: "login" }
  ];

  const permissions = [
    { name: "Xem dữ liệu", granted: true },
    { name: "Chỉnh sửa dữ liệu", granted: true },
    { name: "Tạo báo cáo", granted: true },
    { name: "Xuất dữ liệu", granted: true },
    { name: "Quản lý người dùng", granted: false },
    { name: "Cài đặt hệ thống", granted: false }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <Avatar className="h-20 w-20 border-4 border-primary/20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-primary-foreground">
                    NV
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <div>
                <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                <p className="text-muted-foreground">{profileData.position}</p>
                <p className="text-sm text-muted-foreground">{profileData.organization}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-success/10 text-success">
                    <div className="status-dot active mr-1"></div>
                    Đang hoạt động
                  </Badge>
                  <Badge variant="outline">Admin</Badge>
                </div>
              </div>
            </div>
            
            <Button>
              <Edit3 className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-premium text-center">
              <CardContent className="p-4">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.unit || ""}
                  />
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input 
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="bg-background/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-background/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input 
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-background/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Địa điểm</Label>
                    <Input 
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-background/80"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea 
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="bg-background/80 min-h-20"
                  />
                </div>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Thông tin công việc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="organization">Tổ chức</Label>
                  <Input 
                    id="organization"
                    value={profileData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Chức vụ</Label>
                  <Input 
                    id="position"
                    value={profileData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div>
                  <Label htmlFor="department">Phòng ban</Label>
                  <Input 
                    id="department"
                    value={profileData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="bg-background/80"
                  />
                </div>

                <div>
                  <Label htmlFor="accessLevel">Cấp độ truy cập</Label>
                  <Select>
                    <SelectTrigger className="bg-background/80">
                      <SelectValue placeholder="Administrator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="analyst">Data Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Quyền hạn</h4>
                  <div className="space-y-2">
                    {permissions.map((permission, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{permission.name}</span>
                        <Badge variant={permission.granted ? "default" : "secondary"}>
                          {permission.granted ? "Có quyền" : "Không có quyền"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Đổi mật khẩu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      className="bg-background/80 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input 
                    id="newPassword"
                    type="password"
                    className="bg-background/80"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    className="bg-background/80"
                  />
                </div>

                <Button className="w-full">
                  <Key className="h-4 w-4 mr-2" />
                  Cập nhật mật khẩu
                </Button>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Bảo mật tài khoản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Xác thực 2 lớp</Label>
                    <p className="text-sm text-muted-foreground">Bảo vệ tài khoản với mã OTP</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Thông báo đăng nhập</Label>
                    <p className="text-sm text-muted-foreground">Thông báo qua email khi đăng nhập</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Phiên làm việc</Label>
                    <p className="text-sm text-muted-foreground">Tự động đăng xuất sau 30 phút</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Phiên đăng nhập gần đây</h4>
                  <div className="space-y-2">
                    {[
                      { device: "Windows Desktop", location: "Hà Nội", time: "Hiện tại", current: true },
                      { device: "Chrome Mobile", location: "Hà Nội", time: "2 giờ trước", current: false },
                      { device: "Firefox Desktop", location: "TP.HCM", time: "1 ngày trước", current: false }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded border border-border/50">
                        <div>
                          <p className="text-sm font-medium">{session.device}</p>
                          <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                        </div>
                        {session.current ? (
                          <Badge variant="outline" className="bg-success/10 text-success">Hiện tại</Badge>
                        ) : (
                          <Button size="sm" variant="outline">Đăng xuất</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Thông báo Email</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Cập nhật dữ liệu mới", desc: "Thông báo khi có dữ liệu mới được thêm vào", enabled: true },
                      { label: "Báo cáo hoàn thành", desc: "Thông báo khi báo cáo được tạo xong", enabled: true },
                      { label: "Cảnh báo hệ thống", desc: "Thông báo về tình trạng và bảo trì hệ thống", enabled: true },
                      { label: "Tin tức cập nhật", desc: "Thông báo về tính năng mới và cập nhật", enabled: false }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded border border-border/50">
                        <div>
                          <p className="font-medium">{notification.label}</p>
                          <p className="text-sm text-muted-foreground">{notification.desc}</p>
                        </div>
                        <Switch defaultChecked={notification.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Thông báo trong ứng dụng</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Âm thanh thông báo", enabled: true },
                      { label: "Thông báo desktop", enabled: true },
                      { label: "Hiệu ứng rung", enabled: false }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Label>{notification.label}</Label>
                        <Switch defaultChecked={notification.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt thông báo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Lịch sử hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded border border-border/50"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'report' ? 'bg-primary/10 text-primary' :
                      activity.type === 'data' ? 'bg-success/10 text-success' :
                      activity.type === 'export' ? 'bg-warning/10 text-warning' :
                      'bg-muted/50 text-muted-foreground'
                    }`}>
                      {activity.type === 'report' ? <BarChart3 className="h-4 w-4" /> :
                       activity.type === 'data' ? <Activity className="h-4 w-4" /> :
                       activity.type === 'export' ? <Save className="h-4 w-4" /> :
                       <User className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}