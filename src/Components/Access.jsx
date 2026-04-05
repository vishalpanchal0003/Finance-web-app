import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Access = () => {
  const { setRole } = useContext(AppContext)
  const navigate = useNavigate()

  const Admin = () => {
    setRole("admin")
    navigate('/adminpannel/dashboard')
  }

  const User = () => {
    setRole("user")
    navigate('/userpannel')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white p-4">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">

        <h1 className="text-xl sm:text-2xl font-bold mb-6">Select Role</h1>

        <button
          onClick={Admin}
          className="w-full mb-3 bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition"
        >
          Admin Panel
        </button>

        <button
          onClick={User}
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition"
        >
          User Panel
        </button>

      </div>

    </div>
  )
}

export default Access