import React, { lazy } from 'react'
import Insights from './Insights '
const ComponentsCard = lazy(() => import('./ComponentsCard'))
const LineCharts = lazy(() => import('./LineChart'))
const BarCharts = lazy(() => import('./BarChart'))


const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">

      <ComponentsCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LineCharts />
        <BarCharts />
      </div>
      <div>
        <Insights/>
      </div>
    </div>
  )
}

export default Dashboard