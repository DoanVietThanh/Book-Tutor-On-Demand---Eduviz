"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const TutorResultPage = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const series = [
      {
        name: "Test 1",
        data: [2, 1, 1, 4, 10, 7, 8, 20, 7, 1],
      },
      {
        name: "Test 2",
        data: [10, 5, 20, 10, 9, 7, 3, 4, 7, 1],
      },
    ];

    var options = {
      chart: {
        type: "bar",
        height: 350,
        with: 1000,
      },
      series: series,
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        title: {
          text: "Marks",
        },
        categories: [
          "Điểm 1",
          "Điểm 2",
          "Điểm 3",
          "Điểm 4",
          "Điểm 5",
          "Điểm 6",
          "Điểm 7",
          "Điểm 8",
          "Điểm 9",
          "Điểm 10",
        ],
      },
      yaxis: {
        title: {
          text: "Students",
        },
      },
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: true,
        },
      },
      legend: {
        horizontalAlign: "center",
        offsetX: 40,
      },
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="container bg-white flex flex-col gap-4 min-h-[80vh] pt-4">
      <div id="chart" ref={chartRef} />
    </div>
  );
};

export default TutorResultPage;
