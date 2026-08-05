import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Access = () => {
  const navigate = useNavigate()
  const { setRole } = useContext(AppContext)

  const Admin = () => {
    setRole("admin")
    localStorage.setItem("role", "admin")
    navigate('/adminpannel/dashboard')
    toast.success("Welcome to Admin pannel", { autoClose: 1000, })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white p-4">
      <Toaster />
      <div className="bg-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
        <h1 className="text-xl font-bold mb-6">Select Role</h1>

        <button onClick={Admin} className="w-full mb-3 bg-green-500 py-3 rounded-xl">
          Admin Panel
        </button>
      </div>
    </div>
  )
}

export default Access