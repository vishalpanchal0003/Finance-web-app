import React, { lazy, Suspense, useContext } from 'react'
import { Link, Route, Routes, useNavigate, NavLink, useLocation } from 'react-router-dom'
import Dashboard from './Dashboard'
import { AppContext } from '../Context/AppContext'
import toast, { Toaster } from 'react-hot-toast'

const AddTransaction = lazy(() => import('./AddTransaction'))
const TransactionData = lazy(() => import('./TransactionData'))

const AdminPannel = () => {
  const { setRole } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation() // Current path check karne ke liye

  const Leave = () => {
    localStorage.removeItem("role")
    setRole(null)
    navigate('/')
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 1000,
    });
  };

  // Helper function to get active classes
  const getNavLinkClasses = ({ isActive }) => 
    isActive
      ? "text-blue-400 font-bold bg-blue-500/10 border-blue-500/30" // Active styles
      : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent"; // Inactive styles

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      
      {/* MOBILE NAVIGATION */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-white/10 backdrop-blur-md z-50">
        <div className="flex bg-black/40 p-1ipipip space-x-10 rounded-full p-1 border border-white/10 flex-1 max-w-[280px]">
          <NavLink
            to="/adminpannel/dashboard"
            className={getNavLinkClasses}
          > 
            Dash
          </NavLink>
          
          <NavLink
            to="/adminpannel/addtransaction"
            className={getNavLinkClasses}
          >
            Add 
          </NavLink>
          
          <NavLink
            to="/adminpannel/alltransactions"
            className={getNavLinkClasses}
          > 
            Transactions
          </NavLink>
        </div>
        
        <button onClick={Leave} className="ml-3 bg-rose-500/20 text-rose-500 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all"> 
          Leave 
        </button>
      </div>
      <div className="hidden md:flex w-64 h-full bg-white/5 border-r border-white/10 p-6 flex-col justify-between backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-xl font-black tracking-tight">ADMIN</h2>
          </div>
          
          <nav className="space-y-2">
            <NavLink
              to="/adminpannel/dashboard"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition-all font-medium border ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/adminpannel/addtransaction"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition-all font-medium border ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10"
                }`
              }
            >
              Add Transaction
            </NavLink>

            <NavLink
              to="/adminpannel/alltransactions"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition-all font-medium border ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10"
                }`
              }
            >
              Transactions History
            </NavLink>
          </nav>
        </div>

        <button 
          onClick={Leave} 
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 font-bold shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all"
        >
          Logout
        </button>
      </div>


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
function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading Panel...</p>
    </div>
  )
}

export default AdminPannel