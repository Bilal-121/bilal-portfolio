import { useState, useEffect } from "react";

export default function LiveInfo() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center text-text/70 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-glow rounded-full animate-pulse"></span>
        <span className="font-mono">{formatTime(currentTime)}</span>
      </div>
      <span className="text-text/50 text-[10px]">{formatDate(currentTime)}</span>
    </div>
  );
}
