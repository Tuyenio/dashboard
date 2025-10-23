import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Header
    "header.title": "Dashboard Kinh tế Việt Nam",
    "header.updated": "Cập nhật: Tháng 12/2024",
    
    // Sidebar
    "sidebar.analysis": "Phân tích",
    "sidebar.overview": "Tổng quan",
    "sidebar.industry": "Phân tích Ngành",
    "sidebar.regional": "Phân tích Địa phương",
    "sidebar.comparison": "So sánh",
    "sidebar.reports": "Báo cáo",
    "sidebar.settings": "Cài đặt",
    "sidebar.export": "Xuất dữ liệu",

    // Overview Page
    "overview.title": "Tổng quan Kinh tế Quốc gia",
    "overview.kpi.title": "Chỉ số Kinh tế Chính",
    "overview.enterprises": "Doanh nghiệp hoạt động",
    "overview.new_enterprises": "DN mới thành lập",
    "overview.closed_enterprises": "DN ngừng hoạt động",
    "overview.employees": "Lao động",
    "overview.productivity": "Năng suất lao động",
    "overview.export": "Xuất khẩu",
    "overview.import": "Nhập khẩu",
    "overview.trade_balance": "Cán cân thương mại",
    "overview.revenue": "Doanh thu",
    "overview.profit": "Lợi nhuận",
    "overview.trends": "Xu hướng 12 Tháng",
    "overview.heatmap": "Bản đồ Nhiệt - Chọn chỉ số",
    "overview.top_increase": "Top Tăng Trưởng",
    "overview.top_decrease": "Top Giảm Sút",
    "overview.province": "Tỉnh/Thành",
    "overview.industry": "Ngành",
    "overview.change": "Thay đổi",
    "overview.alerts": "Cảnh báo Hệ thống",
    
    // Industry Page
    "industry.title": "Phân tích Ngành",
    "industry.subtitle": "Chi tiết theo ngành kinh tế",
    "industry.kpi": "KPI Ngành",
    "industry.regional_contribution": "Đóng góp theo Địa phương",
    "industry.export_products": "Nhóm hàng Xuất khẩu",
    "industry.financial_metrics": "Chỉ số Tài chính",
    "industry.profit_margin": "Biên lợi nhuận",
    "industry.liquidity": "Thanh khoản",
    "industry.debt_ratio": "Nợ/Tài sản",
    
    // Regional Page
    "regional.title": "Phân tích Địa phương",
    "regional.subtitle": "Dữ liệu kinh tế theo tỉnh/thành",
    "regional.summary": "Tổng quan Địa phương",
    "regional.industry_structure": "Cấu trúc Ngành",
    "regional.business_trends": "Xu hướng Doanh nghiệp",
    "regional.new_businesses": "DN mới",
    "regional.closed_businesses": "DN đóng cửa",
    "regional.employment": "Việc làm theo Ngành",
    "regional.productivity_comparison": "So sánh Năng suất",
    "regional.trade": "Thương mại Quốc tế",
    "regional.export": "Xuất khẩu",
    "regional.import": "Nhập khẩu",
    
    // Comparison Page
    "comparison.title": "So sánh Đa chiều",
    "comparison.subtitle": "So sánh tỉnh/thành hoặc ngành",
    "comparison.select": "Chọn để So sánh",
    "comparison.province1": "Tỉnh/Thành 1",
    "comparison.province2": "Tỉnh/Thành 2",
    "comparison.province3": "Tỉnh/Thành 3",
    "comparison.industry1": "Ngành 1",
    "comparison.industry2": "Ngành 2",
    "comparison.charts": "Biểu đồ So sánh",
    "comparison.structure": "Cấu trúc",
    "comparison.dynamics": "Động học (12 tháng)",
    "comparison.multi_criteria": "Phân tích Đa tiêu chí",
    "comparison.detail_table": "Bảng So sánh Chi tiết",
    "comparison.metric": "Chỉ số",
    
    // Export & Reports
    "export.title": "Xuất Báo Cáo",
    "export.pdf": "Xuất PDF",
    "export.excel": "Xuất Excel",
    "export.image": "Xuất Hình ảnh",
    "export.success": "Xuất thành công!",
    "export.error": "Lỗi xuất dữ liệu",
    "export.generating": "Đang tạo báo cáo...",

    // Chart Types
    "chart.3d": "Biểu đồ 3D",
    "chart.4d": "Biểu đồ 4D",
    "chart.animated": "Biểu đồ Động",
    "chart.interactive": "Biểu đồ Tương tác",
    "chart.holographic": "Biểu đồ Hologram",

    // Settings
    "settings.theme": "Giao diện",
    "settings.language": "Ngôn ngữ",
    "settings.animation": "Hiệu ứng",
    "settings.high_contrast": "Độ tương phản cao",
    "settings.accessibility": "Hỗ trợ tiếp cận",

    // City/Province Names
    "city.hanoi": "Hà Nội",
    "city.hcmc": "TP. Hồ Chí Minh",
    "city.danang": "Đà Nẵng",
    "city.haiphong": "Hải Phòng",
    "city.cantho": "Cần Thơ",
    "city.binhduong": "Bình Dương",
    "city.dongnai": "Đồng Nai",
    "city.bacninh": "Bắc Ninh",
    "city.vinhphuc": "Vĩnh Phúc",
    "city.thanhhoa": "Thanh Hóa",

    // Common
    "common.month": "Tháng",
    "common.value": "Giá trị",
    "common.billion": "tỷ VNĐ",
    "common.million": "triệu",
    "common.thousand": "nghìn",
    "common.percent": "%",
    "common.loading": "Đang tải...",
    "common.error": "Lỗi",
    "common.refresh": "Làm mới",
    "common.close": "Đóng",
    "common.save": "Lưu",
    "common.cancel": "Hủy",
  },
  en: {
    // Header
    "header.title": "Vietnam Economic Dashboard",
    "header.updated": "Updated: December 2024",
    
    // Sidebar
    "sidebar.analysis": "Analysis",
    "sidebar.overview": "Overview",
    "sidebar.industry": "Industry Analysis",
    "sidebar.regional": "Regional Analysis",
    "sidebar.comparison": "Comparison",
    "sidebar.reports": "Reports",
    "sidebar.settings": "Settings",
    "sidebar.export": "Export Data",

    // Overview Page
    "overview.title": "National Economic Overview",
    "overview.kpi.title": "Key Economic Indicators",
    "overview.enterprises": "Active Enterprises",
    "overview.new_enterprises": "New Enterprises",
    "overview.closed_enterprises": "Closed Enterprises",
    "overview.employees": "Employment",
    "overview.productivity": "Labor Productivity",
    "overview.export": "Export",
    "overview.import": "Import",
    "overview.trade_balance": "Trade Balance",
    "overview.revenue": "Revenue",
    "overview.profit": "Profit",
    "overview.trends": "12-Month Trends",
    "overview.heatmap": "Heat Map - Select KPI",
    "overview.top_increase": "Top Growth",
    "overview.top_decrease": "Top Decline",
    "overview.province": "Province/City",
    "overview.industry": "Industry",
    "overview.change": "Change",
    "overview.alerts": "System Alerts",
    
    // Industry Page
    "industry.title": "Industry Analysis",
    "industry.subtitle": "Detailed by economic sector",
    "industry.kpi": "Industry KPIs",
    "industry.regional_contribution": "Regional Contribution",
    "industry.export_products": "Export Product Groups",
    "industry.financial_metrics": "Financial Metrics",
    "industry.profit_margin": "Profit Margin",
    "industry.liquidity": "Liquidity",
    "industry.debt_ratio": "Debt/Asset Ratio",
    
    // Regional Page
    "regional.title": "Regional Analysis",
    "regional.subtitle": "Economic data by province/city",
    "regional.summary": "Regional Summary",
    "regional.industry_structure": "Industry Structure",
    "regional.business_trends": "Business Trends",
    "regional.new_businesses": "New Businesses",
    "regional.closed_businesses": "Closed Businesses",
    "regional.employment": "Employment by Sector",
    "regional.productivity_comparison": "Productivity Comparison",
    "regional.trade": "International Trade",
    "regional.export": "Export",
    "regional.import": "Import",
    
    // Comparison Page
    "comparison.title": "Multi-dimensional Comparison",
    "comparison.subtitle": "Compare provinces/cities or industries",
    "comparison.select": "Select for Comparison",
    "comparison.province1": "Province/City 1",
    "comparison.province2": "Province/City 2",
    "comparison.province3": "Province/City 3",
    "comparison.industry1": "Industry 1",
    "comparison.industry2": "Industry 2",
    "comparison.charts": "Comparison Charts",
    "comparison.structure": "Structure",
    "comparison.dynamics": "Dynamics (12 months)",
    "comparison.multi_criteria": "Multi-criteria Analysis",
    "comparison.detail_table": "Detailed Comparison Table",
    "comparison.metric": "Metric",
    
    // Export & Reports
    "export.title": "Export Report",
    "export.pdf": "Export PDF",
    "export.excel": "Export Excel",
    "export.image": "Export Image",
    "export.success": "Export successful!",
    "export.error": "Export error",
    "export.generating": "Generating report...",

    // Chart Types
    "chart.3d": "3D Chart",
    "chart.4d": "4D Chart",
    "chart.animated": "Animated Chart",
    "chart.interactive": "Interactive Chart",
    "chart.holographic": "Holographic Chart",

    // Settings
    "settings.theme": "Theme",
    "settings.language": "Language",
    "settings.animation": "Animation",
    "settings.high_contrast": "High Contrast",
    "settings.accessibility": "Accessibility",

    // City/Province Names
    "city.hanoi": "Hanoi",
    "city.hcmc": "Ho Chi Minh City",
    "city.danang": "Da Nang",
    "city.haiphong": "Hai Phong",
    "city.cantho": "Can Tho",
    "city.binhduong": "Binh Duong",
    "city.dongnai": "Dong Nai",
    "city.bacninh": "Bac Ninh",
    "city.vinhphuc": "Vinh Phuc",
    "city.thanhhoa": "Thanh Hoa",

    // Common
    "common.month": "Month",
    "common.value": "Value",
    "common.billion": "Billion VND",
    "common.million": "Million",
    "common.thousand": "Thousand",
    "common.percent": "%",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.refresh": "Refresh",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.vi] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
