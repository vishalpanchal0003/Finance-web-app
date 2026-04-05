import React, { useContext, useMemo } from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { AppContext } from '../Context/AppContext'

const LineCharts = () => {
  const { transactions } = useContext(AppContext)

  const chartData = useMemo(() => {
    const result = {}
    const monthOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      })

      if (!result[month]) {
        result[month] = { month, income: 0, expense: 0 }
      }

      if (t.type === "income") {
        result[month].income += Number(t.amount || 0)
      } else {
        result[month].expense += Number(t.amount || 0)
      }
    })

    return Object.values(result).sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    )
  }, [transactions])

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
      <h2 className="text-lg font-semibold mb-3 text-white">
        Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData}>
          <CartesianGrid stroke="#444" vertical={false} />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            fill="#22c55e33"
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            fill="#ef444433"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineCharts