import { gql, useQuery } from "@apollo/client";
import React from "react";

const USER_TRANSACTIONS = gql`
  query userTransactions {
    users(first: 1000) {
      id
    }
    deposits(first: 1000) {
      id
    }
    borrows(first: 1000) {
      id
    }
    repays(first: 1000) {
      id
    }
  }
`;

const AuroraTestnet = () => {
  const { data, loading } = useQuery(USER_TRANSACTIONS, {
    pollInterval: 60000,
  });
  return (
    <div className="text-lg">
      <h2 className="font-bold text-2xl">Aurora testnet</h2>
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
  );
};

export default AuroraTestnet;
