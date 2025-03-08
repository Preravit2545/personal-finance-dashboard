"use client";

import { BarChart,Bar,Legend, XAxis, YAxis, Tooltip,ResponsiveContainer,CartesianGrid } from "recharts";

const data = [
    { month: "Jan", income: 5000, expense: 3000 },
    { month: "Feb", income: 7000, expense: 4000 },
    { month: "Mar", income: 6500, expense: 4500 },
];

const Chart = () => {
    return (
            <ResponsiveContainer height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" />
                    <Bar dataKey="expense" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        
    );
}
export default Chart;