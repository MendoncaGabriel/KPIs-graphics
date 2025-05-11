import React from "react";

interface RadialProgressProps {
  current: number;
  max: number;
  color: "red" | "blue" | "green" | "yellow";
  title?: string;
}

export default function RadialProgress({ 
  current = 0, 
  max = 100,
  color,
  title
}: RadialProgressProps) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? Math.min(Math.round((current / max) * 100), 100) : 0;
  const progress = (percentage / 100) * circumference;
  const dashOffset = circumference - progress;

  const colorMap = {
    red: {
      circle: "text-red-500",
      gradient: "from-red-600 to-red-400",
      shadow: "rgba(239,68,68,0.5)"
    },
    blue: {
      circle: "text-blue-500",
      gradient: "from-blue-600 to-blue-400",
      shadow: "rgba(59,130,246,0.5)"
    },
    green: {
      circle: "text-emerald-500",
      gradient: "from-emerald-600 to-emerald-400",
      shadow: "rgba(16,185,129,0.5)"
    },
    yellow: {
      circle: "text-yellow-500",
      gradient: "from-yellow-600 to-yellow-400",
      shadow: "rgba(234,179,8,0.5)"
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-slate-900/10 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-${color}-500/10 before:to-transparent before:-z-10`}>
      {title && (
        <h1 className="text-xl font-semibold mb-4 text-slate-200 tracking-wide">
          {title}
        </h1>
      )}
      <div className="relative w-[150px] h-[150px] flex items-center justify-center">
        <svg width="150" height="150" className="transform -rotate-90 relative">
          <defs>
            <filter id={`glow-${color}`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke={colorMap[color].shadow}
            strokeWidth="12"
            fill="none"
            className="opacity-20"
          />
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className={`${colorMap[color].circle} transition-all duration-700`}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            filter={`url(#glow-${color})`}
            style={{ 
              transition: 'stroke-dashoffset 0.7s ease-in-out',
              filter: `drop-shadow(0 0 8px ${colorMap[color].shadow})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className={`text-4xl font-bold mb-1 bg-gradient-to-r ${colorMap[color].gradient} bg-clip-text text-transparent drop-shadow-[0_0_10px_${colorMap[color].shadow}]`}>
            {percentage}%
          </div>
          <div className={`text-sm font-medium tracking-wider text-${color}-100/80`}>
            {current.toLocaleString()}/{max.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}