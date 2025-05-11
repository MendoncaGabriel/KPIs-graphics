interface MultiMetricBarProps {
  metrics: {
    oee: number;
    uptime: number;
    quality: number;
    efficiency: number;
  }
}

export default function MultiMetricBar({ metrics }: MultiMetricBarProps) {
  const total = metrics.oee + metrics.uptime + metrics.quality + metrics.efficiency;
  const scale = total > 0 ? 100 / total : 0;

  const normalizedMetrics = {
    oee: (metrics.oee * scale).toFixed(1),
    uptime: (metrics.uptime * scale).toFixed(1),
    quality: (metrics.quality * scale).toFixed(1),
    efficiency: (metrics.efficiency * scale).toFixed(1),
  };

  const colorMap = {
    oee: {
      bg: "bg-blue-500/80",
      glow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
      hover: "hover:bg-blue-400",
      from: "from-blue-600/20"
    },
    uptime: {
      bg: "bg-emerald-500/80",
      glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
      hover: "hover:bg-emerald-400",
      from: "from-emerald-600/20"
    },
    quality: {
      bg: "bg-red-500/80",
      glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]",
      hover: "hover:bg-red-400",
      from: "from-red-600/20"
    },
    efficiency: {
      bg: "bg-yellow-500/80",
      glow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]",
      hover: "hover:bg-yellow-400",
      from: "from-yellow-600/20"
    }
  };

  return (
    <div className="w-full max-w-3xl p-6 bg-slate-900/20 rounded-[2rem] backdrop-blur-xl border border-white/10 shadow-2xl">
      <div className="h-10 w-full bg-slate-950/40 rounded-full overflow-hidden flex relative backdrop-blur-lg">
        <div 
          style={{ width: `${normalizedMetrics.oee}%` }}
          className={`h-full ${colorMap.oee.bg} ${colorMap.oee.glow} flex items-center justify-center text-white font-medium transition-all duration-1000 ease-in-out relative group ${colorMap.oee.hover}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${colorMap.oee.from} to-transparent`}></div>
          <span className="z-10 text-lg font-bold group-hover:scale-110 transition-transform">
            {metrics.oee}%
          </span>
        </div>
        <div 
          style={{ width: `${normalizedMetrics.uptime}%` }}
          className={`h-full ${colorMap.uptime.bg} ${colorMap.uptime.glow} flex items-center justify-center text-white font-medium transition-all duration-1000 ease-in-out relative group ${colorMap.uptime.hover}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${colorMap.uptime.from} to-transparent`}></div>
          <span className="z-10 text-lg font-bold group-hover:scale-110 transition-transform">
            {metrics.uptime}%
          </span>
        </div>
        <div 
          style={{ width: `${normalizedMetrics.quality}%` }}
          className={`h-full ${colorMap.quality.bg} ${colorMap.quality.glow} flex items-center justify-center text-white font-medium transition-all duration-1000 ease-in-out relative group ${colorMap.quality.hover}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${colorMap.quality.from} to-transparent`}></div>
          <span className="z-10 text-lg font-bold group-hover:scale-110 transition-transform">
            {metrics.quality}%
          </span>
        </div>
        <div 
          style={{ width: `${normalizedMetrics.efficiency}%` }}
          className={`h-full ${colorMap.efficiency.bg} ${colorMap.efficiency.glow} flex items-center justify-center text-white font-medium transition-all duration-1000 ease-in-out relative group ${colorMap.efficiency.hover}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${colorMap.efficiency.from} to-transparent`}></div>
          <span className="z-10 text-lg font-bold group-hover:scale-110 transition-transform">
            {metrics.efficiency}%
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-sm text-slate-200">
        <div className="flex items-center group cursor-pointer">
          <div className={`w-3 h-3 bg-blue-500 rounded-full mr-2 group-hover:animate-pulse ${colorMap.oee.glow}`}></div>
          <span className="group-hover:text-blue-400 transition-colors">OEE</span>
        </div>
        <div className="flex items-center group cursor-pointer">
          <div className={`w-3 h-3 bg-emerald-500 rounded-full mr-2 group-hover:animate-pulse ${colorMap.uptime.glow}`}></div>
          <span className="group-hover:text-emerald-400 transition-colors">Uptime</span>
        </div>
        <div className="flex items-center group cursor-pointer">
          <div className={`w-3 h-3 bg-red-500 rounded-full mr-2 group-hover:animate-pulse ${colorMap.quality.glow}`}></div>
          <span className="group-hover:text-red-400 transition-colors">Quality</span>
        </div>
        <div className="flex items-center group cursor-pointer">
          <div className={`w-3 h-3 bg-yellow-500 rounded-full mr-2 group-hover:animate-pulse ${colorMap.efficiency.glow}`}></div>
          <span className="group-hover:text-yellow-400 transition-colors">Efficiency</span>
        </div>
      </div>
    </div>
  );
}