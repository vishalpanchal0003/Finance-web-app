import React, { useContext, useMemo } from "react";
import { AppContext } from "../Context/AppContext";

const ComponentsCard = () => {
  const { transactions } = useContext(AppContext);

  const income = useMemo(() => {
    return transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  }, [transactions]); 

  const expense = useMemo(() => {
    return transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  }, [transactions]); 

  const balance = useMemo(() => income - expense,[income,expense])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {/* Income */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-lg">
        <h1 className="text-sm text-gray-300">Income</h1>
        <h2 className="text-2xl font-bold text-green-400 mt-1">
          ₹{income}
        </h2>
      </div>

      {/* Expense */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-lg">
        <h1 className="text-sm text-gray-300">Expense</h1>
        <h2 className="text-2xl font-bold text-red-400 mt-1">
          ₹{expense}
        </h2>
      </div>

      {/* Balance */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-lg">
        <h1 className="text-sm text-gray-300">Balance</h1>
        <h2 className="text-2xl font-bold text-blue-400 mt-1">
          ₹{balance}
        </h2>
      </div>
    </div>
  );
};

export default ComponentsCard;