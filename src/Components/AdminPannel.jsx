import React, { lazy, Suspense, useContext } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import { AppContext } from '../Context/AppContext'

const AddTransaction = lazy(() => import('./AddTransaction'))
const TransactionData = lazy(() => import('./TransactionData'))

const AdminPannel = () => {
  const { setRole } = useContext(AppContext)
  const navigate = useNavigate()

  const Leave = () => {
    localStorage.removeItem("role")
    setRole(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-900 via-slate-900 to-black text-white">
      <div className="md:hidden w-full flex justify-center px-3 py-3 gap-2"> <div className="flex w-full max-w-sm bg-gray-900/80 rounded-full p-1 border border-gray-700"> <Link to="/adminpannel/dashboard" className="flex-1 text-center py-2 text-blue-400"> Dashboard </Link> <Link to="/adminpannel/addtransaction" className="flex-1 text-center py-2 text-gray-400"> Add </Link> <Link to="/adminpannel/alltransactions" className="flex-1 text-center py-2 text-gray-400"> Transactions </Link> </div> <button onClick={Leave} className="bg-red-500 px-3 py-1 rounded-md text-white text-sm"> Leave </button> </div>

      <div className="hidden md:flex w-64 h-screen bg-white/10 p-5 flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>
          <Link to="/adminpannel/dashboard" className="block py-2">Dashboard</Link>
<Suspense fallback={<Loading/>}>
          <Link to="/adminpannel/addtransaction" className="block py-2">Add</Link>
</Suspense>
          <Link to="/adminpannel/alltransactions" className="block py-2">Transactions</Link>
        </div>

        <button onClick={Leave} className="bg-red-500 py-2 rounded-md">
          Leave
        </button>
      </div>

      <div className="flex-1 p-4">
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

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}