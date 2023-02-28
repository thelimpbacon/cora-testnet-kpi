import { gql, useQuery } from "@apollo/client";
import React from "react";
import BarChart from "./BarChart";

const USER_TRANSACTIONS = gql`
  query userTransactions {
    users(first: 1000) {
      id
    }
    deposits(first: 1000) {
      id
      timestamp
    }
    borrows(first: 1000) {
      id
      timestamp
    }
    repays(first: 1000) {
      id
      timestamp
    }
  }
`;

const AuroraTestnet = () => {
  const { data, loading } = useQuery(USER_TRANSACTIONS, {
    pollInterval: 60000,
  });

  return (
    <div className="text-lg w-3/4">
      <h2 className="font-bold text-2xl w-full text-center mb-4">
        Aurora testnet
      </h2>
      <div className="text-center mb-4">
        <p>
          <span className="mr-2">Users:</span>
          <span className="font-semibold">{data?.users?.length}</span>
        </p>
        <p>
          <span className="mr-2">Deposits:</span>
          <span className="font-semibold">{data?.deposits?.length}</span>
        </p>
        <p>
          <span className="mr-2">Borrows:</span>
          <span className="font-semibold">{data?.borrows?.length}</span>
        </p>
        <p>
          <span className="mr-2">Repays:</span>
          <span className="font-semibold">{data?.repays?.length}</span>
        </p>
      </div>

      <div>
        <BarChart
          deposits={data?.deposits}
          borrows={data?.borrows}
          repays={data?.repays}
          signalWithdrawals={[]}
          withdraws={[]}
          collect={[]}
        />
      </div>
    </div>
  );
};

export default AuroraTestnet;
