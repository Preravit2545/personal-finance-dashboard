export const fetchTransactions = async (userId: string) => {
  const res = await fetch(`/api/transactions?userId=${userId}`);
  const data = await res.json();
  return data;
};

export const fetchAccount = async (userId: string) => {
  try {
    const res = await fetch(`/api/accounts?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch balance");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching account balance:", error);
    return 0; // กรณี error ให้คืนค่าเป็น 0 เพื่อป้องกันการพังของ UI
  }
};

export const fetchIncome = async (userId: string) => {
  try {
    const res = await fetch(`/api/transactions?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch transactions");

    const data = await res.json();
    return data
      .filter((transaction: any) => transaction.type === "income" && transaction.status === "Success")
      .reduce((acc: number, transaction: any) => acc + parseFloat(transaction.amount), 0);
  } catch (error) {
    console.error("Error fetching income:", error);
    return 0;
  }
};

export const fetchExpense = async (userId: string) => {
  try {
    const res = await fetch(`/api/transactions?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch transactions");

    const data = await res.json();
    return data
      .filter((transaction: any) => transaction.type === "expense" && transaction.status === "Success")
      .reduce((acc: number, transaction: any) => acc + parseFloat(transaction.amount), 0);
  } catch (error) {
    console.error("Error fetching expense:", error);
    return 0;
  }
};
