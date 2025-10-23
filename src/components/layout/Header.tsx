import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Shield, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RealTimeClock } from "@/components/ui/real-time-clock";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface HeaderProps {
  onLogout?: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-20 border-b border-border/30 bg-gradient-to-r from-card via-card to-background/80 backdrop-blur-lg flex items-center justify-between px-8 shadow-elegant"
    >
      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SidebarTrigger className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-300" />
        </motion.div>
        
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
          >
            <Shield className="h-6 w-6 text-primary-foreground" />
          </motion.div>
          
          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight"
            >
              {t("header.title")}
            </motion.h1>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="status-dot active"></div>
              <RealTimeClock className="text-sm" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ThemeToggle />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <LanguageToggle />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-all duration-300">
                <Bell className="h-5 w-5" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 300 }}
                >
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 bg-gradient-to-r from-danger to-warning text-white text-xs font-bold animate-pulse">
                    3
                  </Badge>
                </motion.div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-80 glass-effect" 
              align="end" 
              forceMount
            >
              <DropdownMenuLabel className="font-normal border-b border-border/50 pb-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Thông báo</h4>
                  <Badge variant="outline" className="bg-primary/10 text-primary">3 mới</Badge>
                </div>
              </DropdownMenuLabel>
              
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/30">
                  <div className="flex gap-3 w-full">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Dữ liệu GDP Q3 đã cập nhật</p>
                      <p className="text-xs text-muted-foreground">GDP tăng 7.3% so với cùng kỳ năm trước</p>
                      <p className="text-xs text-muted-foreground">2 phút trước</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/30">
                  <div className="flex gap-3 w-full">
                    <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Báo cáo xuất khẩu hoàn thành</p>
                      <p className="text-xs text-muted-foreground">Báo cáo tháng 10/2024 đã sẵn sàng tải về</p>
                      <p className="text-xs text-muted-foreground">15 phút trước</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/30">
                  <div className="flex gap-3 w-full">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Hệ thống sẽ bảo trì</p>
                      <p className="text-xs text-muted-foreground">Bảo trì định kỳ từ 2:00 - 4:00 sáng ngày mai</p>
                      <p className="text-xs text-muted-foreground">1 giờ trước</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex gap-3 w-full">
                    <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Dữ liệu việc làm cập nhật</p>
                      <p className="text-xs text-muted-foreground">Tỷ lệ việc làm tháng 10 đã được cập nhật</p>
                      <p className="text-xs text-muted-foreground">3 giờ trước</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 text-center hover:bg-primary/10 transition-colors cursor-pointer">
                <span className="text-sm font-medium text-primary">Xem tất cả thông báo</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 glass-effect" 
              align="end" 
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Administrator</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@gov.vn
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-colors cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-danger/10 text-danger transition-colors cursor-pointer"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  );
}
