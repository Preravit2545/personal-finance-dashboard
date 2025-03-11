"use client";

import { useEffect, useState } from "react";

type Transaction = {
  _id: string;
  name: string;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  category: {
    icon: string;
  };
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    const res = await fetch(`/api/transactions?userId=67d03cffc6788dcdbf4e0598`);
    const data = await res.json();
    setTransactions(data)
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions(); // โหลดข้อมูลใหม่
  };

  const saveTransaction = async () => {
    if (!editingTransaction) return;
    await fetch("/api/transactions", {
      method: "PUT",
      body: JSON.stringify(editingTransaction),
    });
    setEditingTransaction(null);
    fetchTransactions();
  };

  return (
    <div className="bg-gray-800 p-2 rounded-xl">

      {/* Table Wrapper */}
      <div className="max-h-72 overflow-y-auto">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <p className="text-3xl">{transaction.category.icon}</p>
                <div>
                  <p className="text-white font-medium">{transaction.name}</p>
                    <p className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className={`font-bold ${parseFloat(transaction.amount) < 0 ? "text-red-400" : "text-green-400"}`}>
                  {transaction.amount} ฿
                </p>
                <span className={`px-3 py-1 text-xs rounded-lg ${transaction.status === "Success" ? "bg-green-500/20 text-green-400"
                  : transaction.status === "Pending" ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                  }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
