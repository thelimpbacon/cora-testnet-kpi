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
import "chartjs-adapter-date-fns";
import consolidate from "./consolidate";

ChartJS.register(TimeScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      stacked: true,
      type: "time",
      time: {
        unit: "day",
      },
    },
    y: {
      stacked: true,
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
  signalWithdrawals: Array<TimeStampShape>;
  withdraws: Array<TimeStampShape>;
  collect: Array<TimeStampShape>;
}

const BarChart = ({
  deposits,
  borrows,
  repays,
  signalWithdrawals,
  withdraws,
  collect,
}: BarChartProps) => {
  const [transactions, setTransactions] = React.useState<
    Record<string, Array<{ x: string; y: number }>>
  >({
    deposits: [],
    borrows: [],
    repays: [],
    signalWithdrawals: [],
    withdraw: [],
    collect: [],
  });

  useEffect(() => {
    const transactionsPerDay = consolidate({
      deposits,
      borrows,
      repays,
      signalWithdrawals,
      withdraws,
      collect,
    });
    setTransactions({
      deposits: transactionsPerDay.deposits,
      borrows: transactionsPerDay.borrows,
      repays: transactionsPerDay.repays,
      signalWithdrawals: transactionsPerDay.signalWithdrawals,
      withdraw: transactionsPerDay.withdraws,
      collect: transactionsPerDay.collect,
    });
  }, [deposits, repays, borrows, signalWithdrawals, withdraws, collect]);

  return (
    <Bar
      options={options}
      data={{
        // labels: Object.keys(transactions?.deposits),
        datasets: [
          {
            label: "Deposits",
            data: transactions?.deposits,
            backgroundColor: "rgba(99, 109, 255, 0.8)",
          },
          {
            label: "Borrows",
            data: transactions?.borrows,
            backgroundColor: "rgba(255, 99, 133, 0.8)",
          },
          {
            label: "Repays",
            data: transactions?.repays,
            backgroundColor: "rgba(99, 255, 122, 0.8)",
          },
          {
            label: "Signal Withdrawals",
            data: transactions?.signalWithdrawals,
            backgroundColor: "rgba(255, 255, 99, 0.8)",
          },
          {
            label: "Withdraws",
            data: transactions?.withdraw,
            backgroundColor: "rgba(255, 99, 255, 0.8)",
          },
          {
            label: "Collects",
            data: transactions?.collect,
            backgroundColor: "rgba(99, 255, 255, 0.8)",
          },
        ],
      }}
    />
  );
};

export default BarChart;
