import React, { lazy, Suspense } from 'react'
import Insights from './Insights '
import { Toaster } from 'react-hot-toast'
const ComponentsCard = lazy(() => import('./ComponentsCard'))
const LineCharts = lazy(() => import('./LineChart'))
const BarCharts = lazy(() => import('./BarChart'))


const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">
<Toaster/>
   <Suspense fallback={<Loading />}>
  <ComponentsCard />
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <LineCharts />
    <BarCharts />
  </div>

  <Insights />
</Suspense>
    </div>
  )
}

export default Dashboard

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading Panel...</p>
    </div>
  )
}