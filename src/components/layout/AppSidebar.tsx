import { 
  LayoutDashboard, 
  TrendingUp, 
  MapPin, 
  GitCompare, 
  FileText, 
  Settings,
  Download,
  Shield,
  Activity,
  BarChart3,
  Globe,
  User
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const { open } = useSidebar();
  const { t } = useLanguage();

  const analysisItems = [
    { title: t("sidebar.overview"), url: "/", icon: LayoutDashboard, badge: "Live" },
    { title: t("sidebar.industry"), url: "/nganh", icon: TrendingUp, badge: null },
    { title: t("sidebar.regional"), url: "/dia-phuong", icon: MapPin, badge: null },
    { title: t("sidebar.comparison"), url: "/so-sanh", icon: GitCompare, badge: "New" },
  ];

  const toolsItems = [
    { title: "Báo cáo", url: "/bao-cao", icon: FileText, badge: null },
    { title: "Profile", url: "/profile", icon: User, badge: null },
    { title: t("sidebar.export"), url: "/export", icon: Download, badge: null },
    { title: t("sidebar.settings"), url: "/settings", icon: Settings, badge: null },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border/50 bg-gradient-to-b from-sidebar-background to-sidebar-background/95 backdrop-blur-xl">
      <SidebarContent>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-6 border-b border-sidebar-border/30"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 rounded-xl bg-gradient-premium flex items-center justify-center shadow-elegant"
            >
              <Shield className="h-7 w-7 text-white" />
            </motion.div>
            {open && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Vietnam Gov
                </h2>
                <div className="flex items-center gap-2">
                  <div className="status-dot active"></div>
                  <p className="text-sm text-sidebar-foreground/70 font-medium">Analytics Hub</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-primary font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {t("sidebar.analysis")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {analysisItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={({ isActive }) =>
                            `group transition-all duration-300 rounded-lg ${
                              isActive
                                ? "bg-gradient-to-r from-sidebar-primary/20 to-sidebar-primary/10 text-sidebar-primary border-l-4 border-sidebar-primary shadow-glow"
                                : "hover:bg-sidebar-accent/50 hover:translate-x-1"
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.badge === "Live" ? "default" : "secondary"}
                              className={`ml-auto text-xs ${
                                item.badge === "Live" ? "bg-success animate-pulse" : ""
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-primary font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Tools & Reports
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {toolsItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `group transition-all duration-300 rounded-lg ${
                              isActive
                                ? "bg-gradient-to-r from-sidebar-primary/20 to-sidebar-primary/10 text-sidebar-primary border-l-4 border-sidebar-primary"
                                : "hover:bg-sidebar-accent/50 hover:translate-x-1"
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                          <span className="font-medium">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </motion.div>

        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-auto p-4"
          >
            <div className="card-premium p-4 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold text-sidebar-foreground">
                National Economic
              </p>
              <p className="text-xs text-sidebar-foreground/60 mb-3">
                Real-time Monitoring
              </p>
              <div className="w-full bg-primary/20 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ delay: 1.5, duration: 1 }}
                />
              </div>
              <p className="text-xs text-sidebar-foreground/60 mt-1">85% Coverage</p>
            </div>
          </motion.div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
