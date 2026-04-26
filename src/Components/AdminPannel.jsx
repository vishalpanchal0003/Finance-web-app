import React, { lazy, Suspense, useContext } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import { AppContext } from '../Context/AppContext'
import toast, { Toaster } from 'react-hot-toast'

const AddTransaction = lazy(() => import('./AddTransaction'))
const TransactionData = lazy(() => import('./TransactionData'))

const AdminPannel = () => {
  const { setRole } = useContext(AppContext)
  const navigate = useNavigate()

  const Leave = () => {
    localStorage.removeItem("role")
    setRole(null)
    navigate('/')
    toast.success(' Logout successful!', {
      position: 'top-right',
      autoClose: 1000,
    });
  };

  return (
    // Parent container ko h-screen aur overflow-hidden diya taki poora page ek sath scroll na ho
    <div className="h-screen w-full flex  flex-col md:flex-row bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      
      {/* MOBILE NAVIGATION - Fixed at top */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-white/10 backdrop-blur-md z-50">
        <div className="flex bg-black/40 rounded-full p-1 border border-white/10 flex-1 max-w-[280px]">
          <Link to="/adminpannel/dashboard" className="flex-1 text-center py-1.5 text-xs font-medium text-blue-400 hover:bg-white/5 rounded-full transition-all"> 
            Dash
          </Link>
          <Link to="/adminpannel/addtransaction" className="flex-1 text-center py-1.5 text-xs font-medium text-blue-400 hover:bg-white/5 rounded-full transition-all">
            Add
          </Link>
          <Link to="/adminpannel/alltransactions" className="flex-1 text-center py-1.5 text-xs font-medium text-blue-400 hover:bg-white/5 rounded-full transition-all"> 
            Txns 
          </Link>
        </div>
        <button onClick={Leave} className="ml-3 bg-rose-500/20 text-rose-500 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all"> 
          Leave 
        </button>
      </div>

      {/* DESKTOP SIDEBAR - Fixed height, no scroll */}
      <div className="hidden md:flex w-64 h-full bg-white/5 border-r border-white/10 p-6 flex-col justify-between backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-xl font-black tracking-tight">ADMIN</h2>
          </div>
          
          <nav className="space-y-1">
            <Link to="/adminpannel/dashboard" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all font-medium border border-transparent hover:border-white/10">Dashboard</Link>
            <Link to="/adminpannel/addtransaction" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all font-medium border border-transparent hover:border-white/10">Add Transaction</Link>
            <Link to="/adminpannel/alltransactions" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all font-medium border border-transparent hover:border-white/10">Transactions History</Link>
          </nav>
        </div>

        <button 
          onClick={Leave} 
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 font-bold shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT AREA - Only this part will scroll */}
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addtransaction" element={<AddTransaction />} />
              <Route path="alltransactions" element={<TransactionData />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      <Toaster />
    </div>
  )
}

export default AdminPannel

// Improved Loading UI
function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading Panel...</p>
    </div>
  )
}