import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";

const AddTransaction = () => {
  const { transactions, setTransactions } = useContext(AppContext);
  const [isShowIncome, setIsShowIncome] = useState(false);
  const [isShowExpense, setIsShowExpense] = useState(false);
  const [income, setIncome] = useState({
    title:"",
    amount: 0,

  });
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,

  });

  useEffect(() => {
    localStorage.setItem('Transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleExpenseOnchange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleIncomeOnchange = (e) => {
    const { name, value } = e.target;
    setIncome((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleAddTransaction = (e, type) => {
  e.preventDefault();
  const data = type === "income" ? income : expense;
  
  if (data.amount <= 0) {
    return alert("Amount must be greater than 0");
  }
  if (!data.title.trim()) {
    return alert("Title required");
  }
  
  setTransactions((prev) => [...prev, {
    amount: Number(data.amount),
    title: data.title,
    type: type,
    date: new Date()
  }]);
  
  type === "income" 
    ? setIncome({ title: "", amount: 0 })
    : setExpense({ title: "", amount: 0 });
};
//   const handleIncome = (e) => {
//     e.preventDefault();
//      if(income.amount<=0){
//       return alert("Fields are empty")
//      }
//          if (!income.title.trim()) {
//   return alert("Title required");
// }
//     setTransactions((prev) => [...prev, {
//   amount: Number(income.amount),
//     title: income.title,
//   type: "income",
//   date: new Date()
// }]);
//     setIncome({
//       title:"",
//       amount:0
//     });
//   };

//   const handleExpense = (e) => {
//     e.preventDefault();
//     if(expense.amount<=0){
//      return  alert("Fields are empty")
//     }
//     if (!expense.title.trim()) {
//   return alert("Title required");
// }
//     setTransactions((prev) => [
//       ...prev,
//       {
//   amount: Number(expense.amount),
//   title: expense.title,
//   type: "expense",
//   date: new Date()
// }
//     ]);
//     setExpense({
//       amount: 0,
//       title: "",
//     });
//   };

  const handleIsShowIncome = () => {
    setIsShowIncome(true);
    setIsShowExpense(false);
  };

  const handleIsShowExpense = () => {
    setIsShowExpense(true);
    setIsShowIncome(false);
  };

  return (
    <div className="transition-all duration-300 ease-in-out min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 text-white">
        <h2 className="text-xl font-bold text-center mb-6">Add Transaction</h2>
        
        <div className="flex gap-3 mb-6 bg-white/10 p-1 rounded-xl">
          <button
            onClick={handleIsShowIncome}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              isShowIncome
                ? "bg-green-400 text-white shadow"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            Income
          </button>

          <button
            onClick={handleIsShowExpense}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              isShowExpense
                ? "bg-red-400 text-white shadow"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            Expense
          </button>
        </div>

        {/* Expense Form */}
        {isShowExpense && (
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
            <h1 className="text-lg font-semibold mb-4">Add Expense</h1>

            <form className="flex flex-col gap-4" onSubmit={(e)=>handleAddTransaction(e,"expense")}>
              <input
                name="amount"
                type="number"
                min={0}
                required
                placeholder="₹ Enter amount"
                onWheel={(e) => e.target.blur()}
                value={expense.amount}
                onChange={handleExpenseOnchange}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                required
                value={expense.title}
                onChange={handleExpenseOnchange}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="bg-red-400 backdrop-blur-md text-white py-3 rounded-xl font-medium hover:bg-blue-500 transition"
              >
                Add Expense
              </button>
            </form>
          </div>
        )}

        {/* Income Form */}
        {isShowIncome && (
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
            <h1 className="text-lg font-semibold mb-4">Add Income</h1>

            <form className="flex flex-col gap-4" onSubmit={(e)=>handleAddTransaction(e,"income")}>
              <input
                min={0}
                required
                value={income.amount}
            onChange={handleIncomeOnchange}
                name="amount"
                type="number"
                placeholder="₹ Enter amount"
                onWheel={(e) => e.target.blur()}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                required
                value={income.title}
            onChange={handleIncomeOnchange}
                name="title"
                type="text"
                placeholder=" Enter Title"
                onWheel={(e) => e.target.blur()}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="bg-green-400 backdrop-blur-md text-white py-3 rounded-xl font-medium hover:bg-blue-500 transition"
              >
                Add Income
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTransaction;