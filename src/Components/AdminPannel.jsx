import React, { lazy } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
const AddTransaction = lazy(()=>import('./AddTransaction'))
const TransactionData= lazy(()=>import('./TransactionData'))

const AdminPannel = () => {
 const navigate=  useNavigate()
 const Leave = ()=>{
  navigate('/')
 }



  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white overflow-x-hidden">

  {/* 🔥 MOBILE NAVBAR (ONLY MOBILE) */}
 <div className="md:hidden w-full flex justify-center px-3 py-3">

  <div className="relative flex w-full max-w-sm 
  bg-gray-900/80 backdrop-blur-xl 
  rounded-full p-1 border border-gray-700 shadow-md overflow-hidden">

    {/* 🔥 SLIDING BACKGROUND */}
    {/* <div className="absolute top-1 left-1 w-1/3 h-[calc(100%-8px)] 
    bg-gray-800 rounded-full 
    transition-all duration-300 ease-in-out">
    </div> */}

    {/* TAB 1 */}
    <Link
      to="/adminpannel/dashboard"
      className="flex-1 flex items-center justify-center z-10
      text-blue-400 py-2 text-sm font-medium"
    >
      Dashboard
    </Link>

    {/* TAB 2 */}
    <Link
      to="/adminpannel/addtransaction"
      className="flex-1 flex items-center justify-center z-10
     text-blue-400 py-2 text-sm font-medium"
    >
      Add
    </Link>

    {/* TAB 3 */}
    <Link
      to="/adminpannel/alltransactions"
      className="flex-1 flex items-center justify-center z-10
       text-blue-400 py-2 text-sm font-medium"
    >
      Transactions
    </Link>

  </div>

</div>

  {/* 💻 DESKTOP SIDEBAR */}
  <div className="hidden md:flex w-64 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 p-5 flex-col gap-4">

    <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>

    <Link to="/adminpannel/dashboard" className="px-3 py-2 rounded-lg hover:bg-white/10">
      Dashboard
    </Link>

    <Link to="/adminpannel/addtransaction" className="px-3 py-2 rounded-lg hover:bg-white/10">
      Add Transaction
    </Link>

    <Link to="/adminpannel/alltransactions" className="px-3 py-2 rounded-lg hover:bg-white/10">
      Transactions
    </Link>

  </div>

  {/* MAIN */}
  <div className="flex-1 p-4 overflow-y-auto">

    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="addtransaction" element={<AddTransaction />} />
      <Route path="alltransactions" element={<TransactionData />} />
    </Routes>

  </div>

</div>
  )
}

export default AdminPannel