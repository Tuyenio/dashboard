import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RealTimeContextType {
  isRealTimeEnabled: boolean;
  animationTrigger: number;
  setRealTimeEnabled: (enabled: boolean) => void;
  triggerAnimation: () => void;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

export function RealTimeProvider({ children }: { children: ReactNode }) {
  const [isRealTimeEnabled, setRealTimeEnabled] = useState(true);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const triggerAnimation = () => {
    setAnimationTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      triggerAnimation();
    }, 8000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  return (
    <RealTimeContext.Provider value={{
      isRealTimeEnabled,
      animationTrigger,
      setRealTimeEnabled,
      triggerAnimation
    }}>
      {children}
    </RealTimeContext.Provider>
  );
}

export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (context === undefined) {
    throw new Error("useRealTime must be used within a RealTimeProvider");
  }
  return context;
}
