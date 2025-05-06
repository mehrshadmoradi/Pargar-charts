"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, Time, CandlestickData } from "lightweight-charts";
import { Candle } from "../types/types";

const CandlestickChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    fetch("/candles.json")
      .then((res) => res.json())
      .then((data: Candle[]) => {
        const formatted: CandlestickData[] = data.map((candle) => ({
          time: candle.time as Time,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        }));

        candleSeries.setData(formatted);
        chart.timeScale().fitContent();
        chart.timeScale().applyOptions({
          shiftVisibleRangeOnNewBar: false,
        });
        setIsLoading(false);
      });
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, 400);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-[80%] m-auto mt-14 relative"
      style={{ height: "400px", backgroundColor: "#fff" }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80">
          <span className="text-gray-500">Loading chart...</span>
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;
