import { useState, useEffect, memo } from "react";

export default memo(function LiveInfo() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center text-text-secondary text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <span className="font-mono">{formatTime(currentTime)}</span>
      </div>
      <span className="text-text-muted text-xs">{formatDate(currentTime)}</span>
    </div>
  );
});
