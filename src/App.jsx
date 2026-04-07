import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./Context/AppProvider";
import Access from "./Components/Access";
import UserPannel from "./Components/UserPannel";
import AdminPanel from "./Components/AdminPannel";
import ProtectedRoute from "../proteced/ProtectedRoute"
import { ToastProvider } from "./Components/TosterContext";

function App() {
  return (
    <AppProvider>
      <ToastProvider>

        <Routes>
          <Route path="/" element={<Access />} />

          <Route
            path="/adminpannel/*"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userpannel"
            element={
              <ProtectedRoute allowedRole="user">
                <UserPannel />
              </ProtectedRoute>
            }
          />
        </Routes>

      </ToastProvider>
    </AppProvider>
  );
}

export default App;