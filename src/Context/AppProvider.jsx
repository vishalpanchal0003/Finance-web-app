import { useState, } from "react";
import { AppContext } from "./AppContext";
export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
  const data = localStorage.getItem("Transactions");
  return data ? JSON.parse(data) : [];
});
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });
  return (
    <AppContext.Provider value={{ transactions, setTransactions, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};