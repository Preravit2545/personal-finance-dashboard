"use client";

type Transaction = {
  id: number;
  name: string;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
};

const transactions: Transaction[] = [
  { id: 1, name: "Adobe After Effect", date: "Mar 10, 2025", amount: "-$29.99", status: "Success" },
  { id: 2, name: "Starbucks Coffee", date: "Mar 12, 2025", amount: "-$5.99", status: "Pending" },
  { id: 3, name: "Freelance Payment", date: "Mar 14, 2025", amount: "+$250.00", status: "Success" },
  { id: 4, name: "Netflix Subscription", date: "Mar 15, 2025", amount: "-$15.99", status: "Failed" },
];

export default function TransactionList() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-md"
        >
          {/* Left Side: Transaction Info */}
          <div>
            <p className="text-white font-medium">{transaction.name}</p>
            <p className="text-gray-400 text-sm">{transaction.date}</p>
          </div>

          {/* Right Side: Amount & Status */}
          <div className="flex items-center gap-4">
            <p className={`font-bold ${transaction.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
              {transaction.amount}
            </p>
            <span
              className={`px-3 py-1 text-xs rounded-lg ${
                transaction.status === "Success"
                  ? "bg-green-500/20 text-green-400"
                  : transaction.status === "Pending"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
