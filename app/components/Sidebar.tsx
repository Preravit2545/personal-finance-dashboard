"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
      <div className="w-64 h-screen bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold">Finance Dashboard</h2>
        <nav className="mt-5">
          <Link href="/dashboard" className="block py-2 px-3 hover:bg-gray-700">🏠 Dashboard</Link>
          <Link href="/dashboard/analytics" className="block py-2 px-3 hover:bg-gray-700">📊 Analytics</Link>
          <Link href="/dashboard/transactions" className="block py-2 px-3 hover:bg-gray-700">💰 Transactions</Link>
          <Link href="/dashboard/settings" className="block py-2 px-3 hover:bg-gray-700">⚙️ Settings</Link>
        </nav>
      </div>
    );
  }
  