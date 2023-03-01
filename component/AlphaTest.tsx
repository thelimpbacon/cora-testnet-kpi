import React from "react";
import BarChart from "./BarChart";
import useSWR from "swr";

//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const AlphaTest = () => {
  const { data } = useSWR("/api/coraTransactions", fetcher);

  return (
    <div className="text-lg w-3/4">
      <h2 className="font-bold text-2xl w-full text-center mb-4">
        Alpha Test (Görli)
      </h2>
      <div className="mb-4 grid grid-cols-3 gap-6 text-left w-1/2 mx-auto">
        <div className="">
          <p>
            <span className="mr-2">Users:</span>
            <span className="font-semibold">{data?.users?.length}</span>
          </p>
        </div>

        <div>
          <p>
            <span className="mr-2">Deposits:</span>
            <span className="font-semibold">{data?.deposits?.length}</span>
          </p>

          <p>
            <span className="mr-2">Signal Withdraws:</span>
            <span className="font-semibold">
              {data?.signalWithdrawals?.length}
            </span>
          </p>

          <p>
            <span className="mr-2">Withdraws:</span>
            <span className="font-semibold">{data?.withdraws?.length}</span>
          </p>

          <p>
            <span className="mr-2">Collect collaterals:</span>
            <span className="font-semibold">{data?.collects?.length}</span>
          </p>
        </div>

        <div>
          <p>
            <span className="mr-2">Borrows:</span>
            <span className="font-semibold">{data?.borrows?.length}</span>
          </p>

          <p>
            <span className="mr-2">Repays:</span>
            <span className="font-semibold">{data?.repays?.length}</span>
          </p>
        </div>
      </div>

      <div>
        <BarChart
          deposits={data?.deposits}
          borrows={data?.borrows}
          repays={data?.repays}
          signalWithdrawals={data?.signalWithdrawals}
          withdraws={data?.withdraws}
          collect={data?.collects}
        />
      </div>
    </div>
  );
};

export default AlphaTest;
