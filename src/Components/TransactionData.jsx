import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { UseToast } from './TosterContext'

const TransactionData = () => {
  const {setToast} = UseToast()
  const { transactions, setTransactions, role } = useContext(AppContext)
  const [searchVal, setSearchVal] = useState('')
  const [sortType, setSortType] = useState('all')


  // useEffect(() => {
  //   const data = localStorage.getItem("Transactions");
  //   if (data) {
  //     setTransactions(JSON.parse(data));
  //   }
  // }, [setTransactions]);




  // ✅ Search filter
  const searchFiltered = transactions.filter((item) => {
    const search = searchVal.toLowerCase();
    return (
      item.title.toLowerCase().includes(search) ||
      item.type.toLowerCase().includes(search)
    );
  });

  // ✅ Sort filter
  const filteredData = searchFiltered.filter((item) => {
    if (sortType === "all") return true;
    if (sortType === "income") return item.type === "income";
    if (sortType === "expense") return item.type === "expense";
    return true;
  });


  // Toster
  

  const handledDleteTransation = (idx) => {
    const deleteTransaction = transactions.filter((_, index) => index !== idx);
    setToast({ show: true, message: "Transaction is deleted" , color:"bg-red-500" });
    setTransactions(deleteTransaction);
    localStorage.setItem("Transactions", JSON.stringify(deleteTransaction));
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-white">
          Transactions
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchVal}
            placeholder="search your transactions"
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 border outline-none border-white/20 text-white placeholder-gray-400 mb-3"
          />

          {/* Sort/Filter Select */}
          <div className="mb-4">
            <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setSortType('all')}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm ${sortType === 'all'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                📋 All
              </button>

              <button
                onClick={() => setSortType('income')}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm ${sortType === 'income'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                💚 Income
              </button>

              <button
                onClick={() => setSortType('expense')}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm ${sortType === 'expense'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                ❤️ Expense
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        {filteredData.length > 0 ? (
          filteredData.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row justify-between bg-white/10 p-4 mb-3 rounded-xl"
            >
              <div>
                <h3 className="font-semibold text-white">{t.title}</h3>

                <p className={t.type === "income" ? "text-green-400" : "text-red-400"}>
                  ₹{t.amount}
                </p>

                <p className="text-sm text-gray-300">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <div className="capitalize mt-2 sm:mt-0 text-gray-300 items-center">
                {t.type}
              </div>

              <div>
                {role === "admin" && (
                  <button
                    onClick={() => handledDleteTransation(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No transactions found</p>
        )}
      </div>
    </div>
  )
}

export default TransactionData