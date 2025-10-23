import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Globe, TrendingUp, BarChart3, Shield, Users, Target, ArrowRight, CheckCircle, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RealTimeClock } from "@/components/ui/real-time-clock";

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    organization: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "GDP Growth", value: 7.3, unit: "%", icon: TrendingUp, color: "text-success" },
    { label: "Export Value", value: 350.8, unit: "B USD", icon: Globe, color: "text-primary" },
    { label: "Employment Rate", value: 96.2, unit: "%", icon: Users, color: "text-warning" },
    { label: "Active Users", value: 25000, unit: "", icon: Shield, color: "text-accent" }
  ];

  const features = [
    {
      title: "Real-time Analytics",
      description: "Dữ liệu kinh tế cập nhật theo thời gian thực",
      icon: BarChart3,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Government Grade Security",
      description: "Bảo mật cấp chính phủ cho dữ liệu nhạy cảm",
      icon: Shield,
      color: "bg-success/10 text-success"
    },
    {
      title: "Advanced Visualization",
      description: "Biểu đồ 4D và heatmap tương tác cao cấp",
      icon: Target,
      color: "bg-warning/10 text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-primary/5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/50 bg-background/80 backdrop-blur-lg"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Economic Dashboard Vietnam
                </h1>
                <RealTimeClock prefix="Live System" className="text-sm" />
              </div>
            </div>
            <Badge variant="outline" className="animate-pulse">
              <div className="status-dot active mr-2"></div>
              Live System
            </Badge>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <Star className="h-3 w-3 mr-1" />
                  Government Analytics Platform
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Dashboard{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                    Kinh tế
                  </span>{" "}
                  Việt Nam
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Hệ thống phân tích dữ liệu kinh tế chuyên nghiệp cấp quốc gia với 
                  công nghệ real-time và bảo mật government-grade
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-bold">
                      <AnimatedCounter 
                        end={stat.value} 
                        decimals={stat.label === "Active Users" ? 0 : 1}
                        suffix={stat.unit}
                      />
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">Tính năng nổi bật</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color}`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-success ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Card className="w-full max-w-md card-premium">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <CardTitle className="text-xl font-bold">
                  Truy cập Hệ thống
                </CardTitle>
                <CardDescription>
                  Đăng nhập để truy cập dashboard kinh tế quốc gia
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                    <TabsTrigger value="register">Đăng ký</TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <TabsContent value="login" className="mt-6">
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleLogin}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="admin@gov.vn"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-background/80"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Mật khẩu</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Nhập mật khẩu"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              className="bg-background/80 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                              Đang đăng nhập...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Đăng nhập
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </motion.form>
                    </TabsContent>

                    <TabsContent value="register" className="mt-6">
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleRegister}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Họ và tên</Label>
                          <Input
                            id="fullName"
                            placeholder="Nguyễn Văn A"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="bg-background/80"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization">Tổ chức</Label>
                          <Input
                            id="organization"
                            placeholder="Bộ Kế hoạch và Đầu tư"
                            value={formData.organization}
                            onChange={(e) => handleInputChange("organization", e.target.value)}
                            className="bg-background/80"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registerEmail">Email</Label>
                          <Input
                            id="registerEmail"
                            type="email"
                            placeholder="email@gov.vn"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-background/80"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registerPassword">Mật khẩu</Label>
                          <div className="relative">
                            <Input
                              id="registerPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Tạo mật khẩu"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              className="bg-background/80 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className="bg-background/80"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                              Đang tạo tài khoản...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Đăng ký
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </motion.form>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 pt-6 border-t border-border/50 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Hệ thống được bảo mật bởi{" "}
                    <span className="font-medium text-primary">Government Security Protocol</span>
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="status-dot active"></div>
                    <span className="text-xs text-success">System Online</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}