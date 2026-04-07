import React, { lazy, Suspense } from 'react'
import Insights from './Insights '
const ComponentsCard = lazy(() => import('./ComponentsCard'))
const LineCharts = lazy(() => import('./LineChart'))
const BarCharts = lazy(() => import('./BarChart'))


const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">

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
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}