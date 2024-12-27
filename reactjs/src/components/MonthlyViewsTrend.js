import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyViewsTrend = ({ dataTotalViewsAnalysis }) => {
  const [dataTotalViews, setDataTotalViews] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has occurred
  const [isChartReady, setIsChartReady] = useState(false); // Track if the chart is ready to render

  // Fetch data from localStorage or props and set chart data
  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("dataTotalViewsAnalysis")
    );
    const propData = dataTotalViewsAnalysis?.data;

    // Determine final data source (priority to propData)
    const finalData =
      Array.isArray(propData) && propData.length > 0
        ? propData
        : storedData?.data || [];

    // Set data with a delay to allow the chart render properly
    if (finalData.length > 0) {
      setTimeout(() => {
        setDataTotalViews(finalData);
        setIsChartReady(true); // Mark chart as ready after setting data
      }, 100); // Delay to make sure chart has time to render
    } else {
      setIsChartReady(false); // If no data, set chart as not ready
    }

    // Save new data to localStorage if it comes from props
    if (Array.isArray(propData) && propData.length > 0) {
      localStorage.setItem(
        "dataTotalViewsAnalysis",
        JSON.stringify({ data: propData })
      );
    }
  }, [dataTotalViewsAnalysis]);

  // Gracefully handle empty data
  if (!dataTotalViews || dataTotalViews.length === 0) {
    return (
      <div className="bg-[#262D35] md:p-6 p-2 rounded shadow-lg border border-gray-700">
        <h2 className="lg:text-2xl md:text-xl text-lg font-semibold mb-4 text-gray-100">
          Monthly Views Trend - {new Date().getFullYear()}
        </h2>
        <p className="text-gray-400">No data available.</p>
      </div>
    );
  }

  // Calculate Y-axis ticks
  const maxValue = Math.max(...dataTotalViews.map((d) => d.totalViews || 0), 0);
  const calculateTicks = (max, interval) => {
    const ticks = [];
    for (let i = 0; i <= max; i += interval) {
      ticks.push(i);
    }
    return ticks;
  };
  const ticks = calculateTicks(Math.ceil(maxValue / 10) * 10, 10);

  return (
    <div className="bg-[#262D35] rounded shadow-lg border border-gray-700 md:py-6 py-2">
      <h2 className="lg:text-2xl md:text-xl text-lg font-semibold mb-4 text-gray-100 md:px-6 px-2">
        Monthly Views Trend - {new Date().getFullYear()}
      </h2>
      <div className="pr-6">
        {isChartReady ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dataTotalViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#CBD5E0", fontSize: 12 }}
                axisLine={{ stroke: "#4A5568" }}
              />
              <YAxis
                width={42}
                tick={{ fill: "#CBD5E0", fontSize: 12 }}
                axisLine={{ stroke: "#4A5568" }}
                ticks={ticks}
                domain={[0, maxValue]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A202C",
                  border: "1px solid #4A5568",
                  borderRadius: "10px",
                  color: "#EDF2F7",
                }}
                labelStyle={{ color: "#63B3ED", fontWeight: "bold" }}
                itemStyle={{ color: "#EDF2F7" }}
              />
              <Line
                type="monotone"
                dataKey="totalViews"
                stroke="#007DB0"
                strokeWidth={4}
                dot={{ stroke: "#007DB0", strokeWidth: 2, r: 5 }}
                activeDot={{ stroke: "#EDF2F7", strokeWidth: 4, r: 5 }}
                isAnimationActive={!hasAnimated} // Trigger animation only once
                animationDuration={2000} // Set the animation duration
                onAnimationEnd={() => setHasAnimated(true)} // Prevent future animations after initial load
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default MonthlyViewsTrend;
