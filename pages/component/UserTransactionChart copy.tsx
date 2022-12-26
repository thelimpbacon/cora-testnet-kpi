import React from "react";
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
import { Scatter } from "react-chartjs-2";

interface UserTransactionChartProps {
  data: any;
}

export const options = {
  // scales: {
  //   y: {
  // 	beginAtZero: true,
  //   },
  // },
};

const UserTransactionChart = ({ data }: UserTransactionChartProps) => {
  return <Scatter options={options} data={data} />;
};

export default UserTransactionChart;
