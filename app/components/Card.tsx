type CardProps = {
  title: string;
  amount: string;
  percentage: string;
  color: "green" | "red" | "blue";
};

export default function Card({ title, amount, percentage, color }: CardProps) {
  const colorMap = {
    green: "text-green-400 bg-green-900/20",
    red: "text-red-400 bg-red-900/20",
    blue: "text-blue-400 bg-blue-900/20",
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-3xl font-bold text-white">{amount}</p>
      <span className={`text-sm px-2 py-1 rounded-lg ${colorMap[color]}`}>
        {percentage}
      </span>
    </div>
  );
}
