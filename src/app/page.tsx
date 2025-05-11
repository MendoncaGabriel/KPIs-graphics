"use client"
import RadialProgress from "@/component/radialProgressBar";
import MultiMetricBar from "@/component/MultiMetricBar";
import { useState, useEffect } from "react";
import MetricsLineChart from "@/component/MetricsLineChart";

export default function Home() {
  const [oee, setOee] = useState<number>(10);
  const [uptime, setUptime] = useState<number>(30);
  const [quality, setQuality] = useState<number>(20);
  const [efficiency, setEfficiency] = useState<number>(40);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOee(Math.floor(Math.random() * 11)); // 0 a 50
      setUptime(Math.floor(Math.random() * 11) + 20); // 20 a 30
      setQuality(Math.floor(Math.random() * 31) + 20); // 30 a 60
      setEfficiency(Math.floor(Math.random() * 51) + 50); // 50 a 100
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-semibold text-left border-b w-full max-w-screen-lg py-4">
        Key Performance Indicators (KPIs)
      </h1>

      <div className="flex items-center justify-center space-x-5">
        <RadialProgress 
          current={oee}
          max={100}
          title="OEE Performance"
          color="blue"
        />
        <RadialProgress 
          current={uptime}
          max={100}
          title="Equipment Uptime"
          color="green"
        />
        <RadialProgress 
          current={quality}
          max={100}
          title="Quality Rate"
          color="red"
        />
        <RadialProgress 
          current={efficiency}
          max={100}
          title="Production Efficiency"
          color="yellow"
        />
      </div>

      <h1 className="text-4xl font-semibold text-left border-b w-full max-w-screen-lg py-4">
        Performance Metrics Overview
      </h1>
      <MultiMetricBar 
        metrics={{ oee, uptime, quality, efficiency }}
      />

      <h1 className="text-4xl font-semibold text-left border-b w-full max-w-screen-lg py-4">
        Historical Performance Trends
      </h1>
      <MetricsLineChart 
        currentMetrics={{ oee, uptime, quality, efficiency }}
      />
    </div>
  );
}
