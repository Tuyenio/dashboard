import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, TrendingUp, Info, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info" | "success";
  timestamp: string;
}

export function AlertCard({ id, title, description, severity, timestamp }: AlertCardProps) {
  const [dismissed, setDismissed] = useState(false);

  const getIcon = () => {
    switch (severity) {
      case "critical":
        return <TrendingDown className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      case "success":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getVariantClass = () => {
    switch (severity) {
      case "critical":
        return "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-100";
      case "warning":
        return "border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-900 dark:text-yellow-100";
      case "info":
        return "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100";
      case "success":
        return "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-950/50 text-green-900 dark:text-green-100";
      default:
        return "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100";
    }
  };

  const getIconColor = () => {
    switch (severity) {
      case "critical":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "info":
        return "text-blue-600 dark:text-blue-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const getSeverityLabel = () => {
    switch (severity) {
      case "critical":
        return "Nghiêm trọng";
      case "warning":
        return "Cảnh báo";
      case "info":
        return "Thông tin";
      case "success":
        return "Thành công";
      default:
        return "Thông tin";
    }
  };

  if (dismissed) return null;

  return (
    <Alert className={cn(
      "relative border-2 transition-all duration-300 hover:shadow-lg",
      getVariantClass()
    )}>
      <div className={cn("shrink-0", getIconColor())}>
        {getIcon()}
      </div>

      <div className="flex-1 space-y-2">
        <AlertTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{title}</span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full border font-medium",
              severity === "critical" && "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700",
              severity === "warning" && "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
              severity === "info" && "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
              severity === "success" && "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
            )}>
              {getSeverityLabel()}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="h-6 w-6 p-0 hover:bg-background/50"
          >
            <X className="h-3 w-3" />
          </Button>
        </AlertTitle>

        <AlertDescription className="text-sm leading-relaxed">
          {description}
        </AlertDescription>

        <div className="flex items-center gap-2 text-xs opacity-70">
          <Clock className="h-3 w-3" />
          <span>{timestamp}</span>
        </div>
      </div>

      {/* Pulse indicator for critical alerts */}
      {severity === "critical" && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}
    </Alert>
  );
}
