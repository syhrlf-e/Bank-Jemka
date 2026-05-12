import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, ArrowLeftRight, Receipt, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminSidebar({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const navLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/users", icon: Users, label: "Kelola Nasabah" },
    { to: "/admin/accounts", icon: CreditCard, label: "Kelola Rekening" },
    { to: "/admin/transfers", icon: ArrowLeftRight, label: "Riwayat Transfer" },
    { to: "/admin/transactions", icon: Receipt, label: "Riwayat Transaksi" },
    { to: "/admin/reports", icon: BarChart3, label: "Laporan" },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-60 bg-primary-900 border-r border-primary-800 flex flex-col hidden lg:flex fixed inset-y-0 left-0 text-white">
        <div className="p-6 flex items-center justify-center">
          <img src="/logo-nama.png" alt="Bank Jemka Logo" className="h-10 object-contain brightness-0 invert" />
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-primary-200 hover:bg-primary-800 hover:text-white"
                )
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary-800 text-primary-200 flex items-center justify-center font-bold">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-body-md font-bold text-white truncate">Administrator</p>
              <p className="text-body-sm font-sans text-primary-300">admin@jemka.com</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start bg-danger text-white hover:bg-danger/90 hover:text-white" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 lg:pl-60">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
