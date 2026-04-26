import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import toast, { Toaster } from 'react-hot-toast'

const TransactionData = () => {
  const [selectedId, setSelectedId] = useState(null)

  const [updateTransactions, setUpdateTransactions] = useState({
    title: "",
    amount: 0
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUpdateTransactions((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { transactions, setTransactions, role } = useContext(AppContext)
  const [updateDiv, setUpdateDiv] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [sortType, setSortType] = useState('all')


  //  Search filter
  const searchFiltered = transactions.filter((item) => {
    const search = searchVal.toLowerCase();
    return (
      item.title.toLowerCase().includes(search) ||
      item.type.toLowerCase().includes(search)
    );
  });

  //  Sort filter
  const filteredData = searchFiltered.filter((item) => {
    if (sortType === "all") return true;
    if (sortType === "income") return item.type === "income";
    if (sortType === "expense") return item.type === "expense";
    return true;
  });

  const handleupdate = (e) => {
    e.preventDefault()
    setTransactions(prev =>
      prev.map((item, index) =>
        index === selectedId
          ? {
            ...item,
            title: updateTransactions.title,
            amount: Number(updateTransactions.amount)

          }
          : item
      ),
      toast.success("update successfully"),
      setUpdateDiv(false)

    )

    setUpdateTransactions({
      title: "",
      amount: 0
    })
  }

  const handleUpdatOpen = (t) => {
    const originalIndex = transactions.findIndex(item => item.id === t.id)
    setSelectedId(originalIndex)
    setUpdateTransactions({
      title: t.title,
      amount: t.amount
    })
    setUpdateDiv(true)
    console.log(selectedId)
  }


  const handledDleteTransation = (idx) => {
    const deleteTransaction = transactions.filter((_, item) => item.id !== idx.id);
    toast.success("delete successfully"),
      setTransactions(deleteTransaction);
    localStorage.setItem("Transactions", JSON.stringify(deleteTransaction));
  };

  return (
    <div className="p-4">
      <Toaster />
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
                  {/* {t.date.toLocaleDateString('en-IN')} */}
                  {new Date(t.date).toLocaleDateString('en-IN')}
                </p>
              </div>

              <div className="capitalize mt-2 sm:mt-0 text-gray-300 items-center">
                {t.type}
              </div>

              <div>

                {role === "admin" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatOpen(t)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handledDleteTransation(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No transactions found</p>
        )}

        <div>
          {updateDiv && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">

              <form
                onSubmit={handleupdate}
                className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col gap-4"
              >

                <h3 className="text-white text-lg font-semibold">
                  Update Transaction
                </h3>

          <button
  type="button"
  onClick={() => setUpdateDiv(false)}
  className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-indigo-400/30 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-full transition-all duration-300 ease-in-out self-end shadow-sm"
>
  Close
</button>

                <input
                  name='title'
                  value={updateTransactions.title}
                  onChange={handleOnchange}
                  type="text"
                  placeholder='Title'
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  name='amount'
                  value={updateTransactions.amount}
                  onChange={handleOnchange}
                  type="number"
                  placeholder='Amount'
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg"
                >
                  Update
                </button>

              </form>

            </div>
          )}

        </div>


      </div>
    </div>
  )
}

export default TransactionData