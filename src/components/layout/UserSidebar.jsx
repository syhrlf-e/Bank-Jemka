import { NavLink } from "react-router-dom";
import { Home, ArrowLeftRight, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserSidebar({ children }) {
  const navLinks = [
    { to: "/dashboard", icon: Home, label: "Home", end: true },
    { to: "/dashboard/transfer", icon: ArrowLeftRight, label: "Transfer" },
    { to: "/dashboard/transactions", icon: Clock, label: "Riwayat" },
    { to: "/dashboard/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center relative">
      <main className="w-full max-w-lg flex-1 bg-neutral-50 shadow-[0_0_40px_-10px_rgba(0,0,0,0.15)] border-x border-neutral-200 relative min-h-screen pb-28 overflow-x-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-105 px-4">
        <nav className="bg-white/90 backdrop-blur-md shadow-xl border border-neutral-200 rounded-full px-6 py-3 flex items-center justify-between">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 p-2 transition-all duration-300",
                  isActive
                    ? "text-primary-600 scale-110 -translate-y-1"
                    : "text-neutral-400 hover:text-neutral-600"
                )
              }
            >
              <link.icon className="w-6 h-6" strokeWidth={2.5} />
              <span className="text-[10px] font-bold">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
