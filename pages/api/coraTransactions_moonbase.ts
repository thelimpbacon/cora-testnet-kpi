import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Interface } from "ethers";
import LendingPoolAbi from "../../lib/lendingPoolABI.json";

const getUsers = (transactions: Array<any>) => {
  const users = new Set<string>();

  transactions.forEach((transaction) => {
    users.add(transaction.from);
  });

  return Array.from(users);
};

const extractFunctionName = (input: string) => {
  const coraInterface = new Interface(LendingPoolAbi);
  const parsedInput = coraInterface.parseTransaction({ data: input });

  return parsedInput?.name;
};

const getTransactions = (
  transactions: Array<{
    timeStamp: string;
    input: string;
    isError: string;
  }>
) => {
  const transactionList = transactions.map((transaction) => {
    const { timeStamp, input, isError } = transaction;

    return {
      timestamp: timeStamp,
      functionName: extractFunctionName(input),
      isError: isError === "0" ? false : true,
    };
  });

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
      .filter((transaction) => transaction.functionName === "signalWithdraw"),
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
  const apiUrl =
    "https://moonbase-blockscout.testnet.moonbeam.network/api?module=account&action=txlist&address=0x0EbfEd99C2f8a437b2Db202954ceaf5b92C8d7EE&starttimestamp=1677945600";

  try {
    const response = await axios.get(apiUrl);
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
