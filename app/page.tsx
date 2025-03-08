import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Chart from "./components/Chart";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="container w-full">
      <Dashboard />
    </div>
  );
}
