import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RealTimeClockProps {
  className?: string;
  showSeconds?: boolean;
  prefix?: string;
}

export function RealTimeClock({ className = "", showSeconds = true, prefix = "Cập nhật:" }: RealTimeClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: false
    };
    
    return date.toLocaleString('vi-VN', options);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-muted-foreground ${className}`}
    >
      <span>{prefix} </span>
      <motion.span
        key={currentTime.getSeconds()}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-medium"
      >
        {formatTime(currentTime)}
      </motion.span>
      <span className="ml-2 text-success">• Cập nhật thời gian thực</span>
    </motion.div>
  );
}