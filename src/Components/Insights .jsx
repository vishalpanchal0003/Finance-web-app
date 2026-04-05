import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Insights = () => {
  const { transactions } = useContext(AppContext)

  const expense = transactions.filter(t => t.type === "expense")

  const categoryTotals = {}

  expense.forEach(t => {
    const key = t.title || "Other"

    if (!categoryTotals[key]) {
      categoryTotals[key] = 0
    }

    categoryTotals[key] += Number(t.amount)
  })

  let maxCategory = "None"
  let maxAmount = 0

  for (let key in categoryTotals) {
    if (categoryTotals[key] > maxAmount) {
      maxAmount = categoryTotals[key]
      maxCategory = key
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">

      <h2 className="text-lg font-semibold mb-2">Top Spending</h2>

      <p className="text-yellow-400 text-lg">{maxCategory}</p>
      <p className="text-white">₹ {maxAmount}</p>

    </div>
  )
}

export default Insights