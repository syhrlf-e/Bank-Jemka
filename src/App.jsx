import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "./pages/Landing";
import UserLogin from "./pages/auth/UserLogin";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/auth/AdminLogin";
import Dashboard from "./pages/user/Dashboard";
import Transfer from "./pages/user/Transfer";
import UserTransactions from "./pages/user/Transactions";
import UserProfile from "./pages/user/Profile";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminAccounts from "./pages/admin/Accounts";
import AdminTransfers from "./pages/admin/Transfers";
import AdminTransactions from "./pages/admin/Transactions";
import AdminReports from "./pages/admin/Reports";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/transfer" element={<Transfer />} />
            <Route path="/dashboard/transactions" element={<UserTransactions />} />
            <Route path="/dashboard/profile" element={<UserProfile />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/accounts" element={<AdminAccounts />} />
            <Route path="/admin/transfers" element={<AdminTransfers />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/reports" element={<AdminReports />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
