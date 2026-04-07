import React, { useContext } from "react";
import LineCharts from "../Components/LineChart";
import BarCharts from "../Components/BarChart";
import ComponentsCard from "./ComponentsCard";
import { useNavigate } from "react-router-dom";
import TransactionData from "./TransactionData";
import Insights from "./Insights ";
import { AppContext } from "../Context/AppContext";
const UserPannel = () => {
  const { setRole } = useContext(AppContext)
  const navigate = useNavigate()
  const Leave = () => {
    localStorage.removeItem("user")
    setRole(null)
    navigate('/')
  }
  return (<div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black p-4 text-white">
    <div className=" bg-gradient-to-br from-blue-90 text-white px-4 sm:px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg sm:text-xl font-semibold"> Finance Dashboard </h1>
      <div className="flex items-center gap-3 text-sm">
        <button onClick={Leave} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white text-sm" > Leave </button>
      </div>
    </div>
    <ComponentsCard />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="bg-white/10 p-4 rounded-xl">
        <LineCharts />
      </div>
      <div className="bg-white/10 p-4 rounded-xl">
        <BarCharts />
      </div>
      <div>
        <Insights />
      </div>
      <TransactionData />
    </div>
  </div>);
};
export default UserPannel