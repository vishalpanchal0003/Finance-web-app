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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white">

      {/* SIDEBAR */}
      <div className="w-full md:w-64 md:h-screen bg-white/10 backdrop-blur-xl border-b md:border-r border-white/20 p-4 flex md:flex-col gap-2 overflow-x-auto">
        
        <h2 className="text-lg font-bold mb-2 hidden md:block">
          Admin Dashboard
        </h2>
  

        <Link to="/adminpannel/dashboard" className="px-3 py-2 rounded-lg hover:bg-white/10 whitespace-nowrap">
          Dashboard
        </Link>

        <Link to="/adminpannel/addtransaction" className="px-3 py-2 rounded-lg hover:bg-white/10 whitespace-nowrap">
          Add
        </Link>

        <Link to="/adminpannel/alltransactions" className="px-3 py-2 rounded-lg hover:bg-white/10 whitespace-nowrap">
          Transactions
        </Link>
<div className="p-3 sm:p-0 sm:fixed sm:bottom-6 sm:left-6 w-full sm:w-auto">
  <button
    onClick={Leave}
    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 active:scale-95 transition px-3 py-3 sm:py-2 rounded-xl font-semibold shadow-lg text-sm sm:text-base"
  >
    Leave
  </button>
</div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:ml-0 overflow-y-auto">

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