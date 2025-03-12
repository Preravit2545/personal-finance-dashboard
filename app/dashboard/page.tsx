"use client";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";
import { fetchAccount, fetchTransactions } from "../lib/apiutil";

type Account ={
  _id: string;
  name: string;
  balance: number;
  type: string;
  userId: string;
}

type Transactions = {
  _id: string;
  name: string;
  date: Date;
  type: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
  createdAt: Date;
  category: {
    icon: string;
  };
};

export default function Dashboard() {

  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<Transactions[]>([]);
  const [expense, setExpense] = useState<Transactions[]>([]);
  const [account, setAccount] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const userId = "67d03cffc6788dcdbf4e0598"; 

  useEffect(() => {
    const fetchUserAccount = async () => {
      const accounts = await fetchAccount(userId);
      setBalance(accounts.reduce((acc: number, account: Account) => acc + account.balance, 0));
    }

    const fetchUserTransactions = async () => {
      const transactions = await fetchTransactions(userId);
      setIncome(transactions.filter((transaction: Transactions) => transaction.type === "income" && transaction.status === "Success").reduce((acc: number, transaction: Transactions) => acc + transaction.amount, 0));
      setExpense(transactions.filter((transaction: Transactions) => transaction.type === "expense" && transaction.status === "Success").reduce((acc: number, transaction: Transactions) => acc + transaction.amount, 0));
    }

    fetchUserTransactions();
    fetchUserAccount();
  }, [userId]);


  return (
    <div className="flex min-h-screen min-w-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 p-6">
        {/* Navbar */}
        <Navbar title="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Income & Expense Summary */}
          <Card title="Total Income" amount={`${income.toLocaleString()} ฿`} percentage="+12.5%" color="green" />
          <Card title="Total Expense" amount={`${expense.toLocaleString()} ฿`} percentage="8.2%" color="red" />
          <Card title="Account Balance" amount={`${balance.toLocaleString()} ฿`} percentage="Safe" color="blue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Analytics Chart */}
          <div className="md:col-span-2 bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Analytics</h2>
            <Chart />
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}
