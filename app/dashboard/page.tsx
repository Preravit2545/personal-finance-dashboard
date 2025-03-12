"use client";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";

type Balance = {
  balance: number;
}

type Transactions = {
  _id: string;
  name: string;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  category: {
    icon: string;
  };
};

export default function Dashboard() {

  const [balance, setBalance] = useState<Balance[]>([]);
  const [income, setIncome] = useState<Transactions[]>([]);
  const [expense, setExpense] = useState<Transactions[]>([]);

  const fetchBalance = async () => {
    try {
      const res = await fetch(`/api/accounts?userId=67d03cffc6788dcdbf4e0598`);
      const data = await res.json();
      if (res.ok) {
        const totalBalance = data.reduce((acc: number, account: any) => acc + account.balance, 0);
        setBalance(totalBalance);
      }
    } catch (error) {
      console.error("Error fetching account balance:", error);
    }
  };

  const fetchIncome = async () => {
    try {
      const res = await fetch(`/api/transactions?userId=67d03cffc6788dcdbf4e0598`);
      const data = await res.json();
      if (res.ok) {
        const totalIncome = data
          .filter((transaction: any) => transaction.type === "income" && transaction.status === "Success")
          .reduce((acc: number, transaction: any) => acc + parseFloat(transaction.amount), 0);
        setIncome(totalIncome);
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  const fetchExpense = async () => {
    try {
      const res = await fetch(`/api/transactions?userId=67d03cffc6788dcdbf4e0598`);
      const data = await res.json();
      if (res.ok) {
        const totalExpense = data
          .filter((transaction: any) => transaction.type === "expense" && transaction.status === "Success")
          .reduce((acc: number, transaction: any) => acc + parseFloat(transaction.amount), 0);
        setExpense(totalExpense);
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchIncome();
    fetchExpense();
  }, []);


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
