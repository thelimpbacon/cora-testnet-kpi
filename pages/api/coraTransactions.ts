import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const getUsers = (transactions: Array<any>) => {
  const users = new Set<string>();

  transactions.forEach((transaction) => {
    users.add(transaction.from);
  });

  return Array.from(users);
};

const extractFunctionName = (input: string) => {
  const index = input.indexOf("(");

  if (index !== -1) {
    const output = input.slice(0, index).trim();

    return output;
  }
};

const getTransactions = (
  transactions: Array<{
    timeStamp: string;
    functionName: string;
    methodId: string;
    isError: string;
  }>
) => {
  const transactionList = transactions.map((transaction) => {
    const { timeStamp, functionName, methodId, isError } = transaction;

    return {
      timestamp: timeStamp,
      functionName: functionName ? extractFunctionName(functionName) : methodId,
      isError: isError === "0" ? false : true,
    };
  });

  /**
   *  'deposit',
   *    'borrow',
   *    'repay',
   *    '0x71818e44', // signal withdrawal
   *    'withdraw',
   *    'collect'
   */

  return {
    deposits: transactionList
      .filter((transaction) => !transaction.isError)
      .filter((transaction) => transaction.functionName === "deposit"),
    borrows: transactionList
      .filter((transaction) => !transaction.isError)
      .filter((transaction) => transaction.functionName === "borrow"),
    repays: transactionList
      .filter((transaction) => !transaction.isError)
      .filter((transaction) => transaction.functionName === "repay"),
    signalWithdrawals: transactionList
      .filter((transaction) => !transaction.isError)
      .filter((transaction) => transaction.functionName === "0x71818e44"),
    withdraws: transactionList
      .filter((transaction) => !transaction.isError)
      .filter((transaction) => transaction.functionName === "withdraw"),
    collects: transactionList
      .filter((transaction) => !transaction.isError)
      .filter((transaction) => transaction.functionName === "collect"),
  };
};

const fetchCoraTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const apiUrl = "https://api-goerli.etherscan.io/api";
  const queryParams = {
    module: "account",
    action: "txlist",
    address: "0x39c204B0b0A1270A3c09372f3069afBB42634499",
    startblock: 8495941,
    endblock: 99999999,
    page: 1,
    offset: 10000,
    sort: "asc",
    apikey: "A5BPJERTIF8BJWNG2QWN9YZQR279Y32CFV",
  };

  try {
    const response = await axios.get(apiUrl, { params: queryParams });
    const transactions = response.data.result;

    const users = getUsers(transactions);
    const transactionsList = getTransactions(transactions);

    res.status(200).json({
      users,
      ...transactionsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default fetchCoraTransactions;
