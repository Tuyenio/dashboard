import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthPage } from "./pages/AuthPage";
import { ChatBotToggle } from "./components/ui/ai-chat-bot";
import Overview from "./pages/Overview";
import Industry from "./pages/Industry";
import Regional from "./pages/Regional";
import Comparison from "./pages/Comparison";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {!isAuthenticated ? (
                <AuthPage onLogin={handleLogin} />
              ) : (
                <DashboardLayout onLogout={handleLogout}>
                  <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/nganh" element={<Industry />} />
                    <Route path="/dia-phuong" element={<Regional />} />
                    <Route path="/so-sanh" element={<Comparison />} />
                    <Route path="/bao-cao" element={<Reports />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ChatBotToggle />
                </DashboardLayout>
              )}
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
