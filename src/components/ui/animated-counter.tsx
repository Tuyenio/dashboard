import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  enableAnimation?: boolean;
  realTimeVariation?: boolean;
}

export function AnimatedCounter({
  end,
  duration = 2,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
  enableAnimation = true,
  realTimeVariation = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [displayValue, setDisplayValue] = useState(end);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (realTimeVariation) {
      // Generate slight variation for real-time effect (±3% to ±7%)
      const variationPercent = 0.03 + Math.random() * 0.04;
      const variation = end * (Math.random() > 0.5 ? 1 + variationPercent : 1 - variationPercent);
      setDisplayValue(variation);
      setAnimationKey(prev => prev + 1);
    }
  }, [end, realTimeVariation]);

  // Auto refresh every 8 seconds
  useEffect(() => {
    if (realTimeVariation) {
      const interval = setInterval(() => {
        const variationPercent = 0.03 + Math.random() * 0.04;
        const variation = end * (Math.random() > 0.5 ? 1 + variationPercent : 1 - variationPercent);
        setDisplayValue(variation);
        setAnimationKey(prev => prev + 1);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [end, realTimeVariation]);

  useEffect(() => {
    if (!enableAnimation) {
      setCount(displayValue);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeOutCubic * displayValue;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [displayValue, duration, enableAnimation]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  return (
    <motion.span
      key={animationKey}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ 
        scale: [1, 1.03, 1],
        opacity: [1, 0.9, 1]
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      className={`font-mono transition-all duration-200 ${className}`}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
}
