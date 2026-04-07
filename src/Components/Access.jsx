import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { UseToast } from './TosterContext'
import { useNavigate } from 'react-router-dom'

const Access = () => {
  const navigate = useNavigate()
  const { setToast } = UseToast()
  const { setRole } = useContext(AppContext)

  const Admin = () => {
    setRole("admin")
    localStorage.setItem("role", "admin")

    setToast({
      show: true,
      message: "Welcome to Admin Dashboard",
      color: "bg-green-400"
    })

    navigate('/adminpannel/dashboard')
  }

  const User = () => {
    setRole("user")
    localStorage.setItem("role", "user")

    setToast({
      show: true,
      message: "Welcome to User Dashboard",
      color: "bg-green-400"
    })

    navigate('/userpannel')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white p-4">
      <div className="bg-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
        <h1 className="text-xl font-bold mb-6">Select Role</h1>

        <button onClick={Admin} className="w-full mb-3 bg-green-500 py-3 rounded-xl">
          Admin Panel
        </button>

        <button onClick={User} className="w-full bg-blue-500 py-3 rounded-xl">
          User Panel
        </button>
      </div>
    </div>
  )
}

export default Access