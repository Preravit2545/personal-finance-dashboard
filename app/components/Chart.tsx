"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Chart = () => {
    const [data, setData] = useState<{ month: string; income: number; expense: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = "67d03cffc6788dcdbf4e0598";

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                const [expenseRes, incomeRes] = await Promise.all([
                    fetch(`/api/transactions/expense?userId=${userId}`),
                    fetch(`/api/transactions/income?userId=${userId}`)
                ]);

                const expenseData = await expenseRes.json();
                const incomeData = await incomeRes.json();

                // แปลงข้อมูลให้เป็นรูปแบบที่ Chart ใช้
                const combinedData = mergeData(incomeData.incomes, expenseData.expense);
                setData(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // ฟังก์ชันรวมข้อมูลรายรับและรายจ่ายตามเดือน
    const mergeData = (incomes: any[], expenses: any[]) => {
        const months: { [key: string]: { month: string; income: number; expense: number } } = {};

        incomes.forEach(({ year, month, totalIncome }) => {
            const key = `${year}-${month}`;
            if (!months[key]) months[key] = { month: `${year}-${month}`, income: 0, expense: 0 };
            months[key].income = totalIncome;
        });

        expenses.forEach(({ year, month, totalexpense }) => {
            const key = `${year}-${month}`;
            if (!months[key]) months[key] = { month: `${year}-${month}`, income: 0, expense: 0 };
            months[key].expense = totalexpense;
        });

        return Object.values(months);
    };

    if (loading) return <p>Loading chart...</p>;

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
};

export default Chart;
