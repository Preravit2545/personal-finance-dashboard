"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Transaction = {
  _id: string;
  name: string;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    const res = await fetch(`/api/transactions?page=${page}&limit=${limit}`);
    const data = await res.json();
    setTransactions(data.transactions);
    setTotal(data.total);
  };

  const deleteTransaction = async (id: string) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchTransactions();
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
                {editingTransaction?._id === transaction._id ? (
                  <input
                    type="text"
                    className="bg-gray-600 text-white p-2 rounded"
                    value={editingTransaction.name}
                    onChange={(e) => setEditingTransaction({ ...editingTransaction, name: e.target.value })}
                  />
                ) : (
                  <div>
                    <p className="text-white font-medium">{transaction.name}</p>
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <p className={`font-bold ${transaction.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {transaction.amount}
                </p>
                <span className={`px-3 py-1 text-xs rounded-lg ${
                  transaction.status === "Success" ? "bg-green-500/20 text-green-400"
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} 
          className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
        >
          Previous
        </button>
        <p className="text-white">Page {page} of {Math.ceil(total / limit)}</p>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page * limit >= total} 
          className={`px-4 py-2 rounded-lg ${page * limit >= total ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
