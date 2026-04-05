import React, { useContext } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { AppContext } from '../Context/AppContext'

const BarCharts = () => {
  const { transactions } = useContext(AppContext)

  const result = {}

  transactions.forEach((t) => {
    if (t.type !== "expense") return

    const category = t.title || "Other"

    if (!result[category]) {
      result[category] = { category, amount: 0 }
    }

    result[category].amount += t.amount
  })

  const chartData = Object.values(result)

  const COLORS = ["#4ade80", "#60a5fa", "#a78bfa", "#fbbf24"]

  return (
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow border border-white/20">
      
      <h2 className="text-lg font-semibold mb-4 text-white">
        Spending by Category
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          barCategoryGap="20%"
          barGap={2}
        >
          <CartesianGrid stroke="#444" vertical={false} />

          <XAxis
            dataKey="category"
            stroke="#ccc"
            tick={{ fontSize: 12 }}
          />

          <YAxis stroke="#ccc" tick={{ fontSize: 12 }} />

          <Tooltip />

          <Bar
            dataKey="amount"
            barSize={30}
            radius={[10, 10, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarCharts