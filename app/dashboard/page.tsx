import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";

import { FiArrowUpRight,FiArrowDownLeft } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 p-6">
        {/* Navbar */}
        <Navbar title="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Income & Expense Summary */}
          <Card title="Total Income" amount="$6,320" percentage="+12.5%" color="green"/>
          <Card title="Total Expense" amount="$2,480" percentage="-8.2%" color="red" />
          <Card title="Budget Left" amount="$3,840" percentage="Safe" color="blue" />
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
