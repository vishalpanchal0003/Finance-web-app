import React from "react";
import LineCharts from "../Components/LineChart";
import BarCharts from "../Components/BarChart";
import ComponentsCard from "./ComponentsCard";
import { useNavigate } from "react-router-dom";
import TransactionData from "./TransactionData";
import Insights from "./Insights ";

const UserPannel = () => {
    const navigate = useNavigate()

    const Leave = ()=>{
         navigate('/')
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black p-4 text-white">

      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        User Dashboard
      </h1>
 <div className="p-3 sm:p-4 flex justify-center sm:justify-end">
  <button
    onClick={Leave}
    className="w-full sm:w-auto bg-red-500 hover:bg-red-400 active:scale-95 transition px-5 py-3 sm:py-2 rounded-xl mt[-20px] font-semibold shadow-lg text-sm sm:text-base"
  >
    Leave
  </button>
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
          <Insights/>
        </div>
          <TransactionData/>
      </div>

    </div>
  );
};

export default UserPannel;