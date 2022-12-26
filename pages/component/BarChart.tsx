import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import consolidate from "./consolidate";
// import { format, parse } from  "chartjs-adapter-date-fns";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export const options = {
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         time: {
//           unit: "day",
//           displayFormats: {
//             day: "MMM D",
//           },
//         },
//         sort: true,
//       },
//     ],
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "bottom" as const,
//     },
//   },
// };

const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
    },
  },
};

type TimeStampShape = {
  id: string;
  timestamp: number;
};

interface BarChartProps {
  deposits: Array<TimeStampShape>;
  borrows: Array<TimeStampShape>;
  repays: Array<TimeStampShape>;
}

const BarChart = ({ deposits, borrows, repays }: BarChartProps) => {
  const [transactions, setTransactions] = React.useState({
    deposits: {},
    borrows: {},
    repays: {},
  });

  useEffect(() => {
    const transactionsPerDay = consolidate({ deposits, borrows, repays });
    setTransactions({
      deposits: transactionsPerDay.deposits,
      borrows: transactionsPerDay.borrows,
      repays: transactionsPerDay.repays,
    });
  }, [deposits, repays, borrows]);

  return (
    <Bar
      options={options}
      data={{
        labels: Object.keys(transactions?.deposits),
        datasets: [
          {
            label: "Deposits",
            data: Object.values(transactions?.deposits),
            backgroundColor: "rgba(99, 109, 255, 0.8)",
          },
          {
            label: "Borrows",
            data: Object.values(transactions?.borrows),
            backgroundColor: "rgba(255, 99, 133, 0.8)",
          },
          {
            label: "Repays",
            data: Object.values(transactions?.repays),
            backgroundColor: "rgba(99, 255, 122, 0.8)",
          },
        ],
      }}
    />
  );
};

export default BarChart;
