"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/groupedChart.json")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setIsLoading(false);
      });
  }, [data]);

  return (
    <div
      className="w-[80%] md:w-[80%] mx-auto mt-10 p-4 rounded-xl bg-[#0F0F1C] text-white relative"
      style={{ minHeight: "350px" }}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F1C]">
          <p className="text-gray-400 animate-pulse">
            در حال بارگذاری نمودار عملکرد...
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="flex justify-center flex-2 min-w-fit">
              <h2 className="text-center mb-4 text-[#ffa500]">عملکرد ربات</h2>
              <span className="w-[25px] h-[25px] mx-2 flex justify-center items-center text-center rounded-full bg-[#ffa500]">
                <Image
                  src="/icons/robot.png"
                  alt="User avatar"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            <div className="flex justify-center flex-2 min-w-fit">
              <h2 className="text-center mb-4 text-[#ff7789]">عملکرد فاطمه</h2>
              <span className="w-[25px] h-[25px] mx-2 flex justify-center items-center text-center rounded-full bg-[#ff7789]">
                <Image
                  src="/icons/crown.png"
                  alt="User avatar"
                  width={20}
                  height={20}
                />
              </span>
            </div>

            <h2 className="flex-6 text-center mb-4 font-bold">
              میزان ضرر شما و ربات در هر معامله
            </h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              layout="horizontal"
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3f" />
              <XAxis dataKey="name" tick={{ fill: "white" }} />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                ticks={[20, 40, 80, 100]}
                tick={{ fill: "white" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  borderColor: "#333",
                }}
              />
              <Bar dataKey="fatemeh" fill="#ff7789" radius={[4, 4, 0, 0]} />
              <Bar dataKey="robot" fill="#ffa500" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
