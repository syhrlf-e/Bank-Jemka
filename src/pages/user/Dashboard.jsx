import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Send, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import UserSidebar from "@/components/layout/UserSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  { id: 1, type: "in", name: "Transfer dari Rehan Tohapok", date: "10 Mei 2026, 14:30", amount: 500000 },
  { id: 2, type: "out", name: "Transfer ke Ujang Wonogiri", date: "09 Mei 2026, 09:15", amount: 150000 },
  { id: 3, type: "in", name: "Setoran Awal", date: "01 Mei 2026, 10:00", amount: 5000000 },
];

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Halo, Rusdi! 👋</h1>
        <p className="text-body-sm text-neutral-500">
          {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date())}
        </p>
      </div>

      <div className="space-y-4 mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary-600 to-primary-800 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm font-medium">
                Tabungan
              </span>
              <p className="text-sm font-sans text-primary-100">69-222-896</p>
            </div>
            <div>
              <p className="text-xs font-medium text-primary-100 mb-1">Total Saldo</p>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-sans font-bold tracking-tight">
                  {showBalance ? "Rp 5.000.000" : "Rp ••••••••"}
                </h2>
                <button onClick={() => setShowBalance(!showBalance)} className="text-primary-100 hover:text-white transition-colors">
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
              <Send className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-neutral-900">Transfer Dana</h3>
              <p className="text-xs text-neutral-500">Kirim uang cepat & aman</p>
            </div>
            <Link to="/dashboard/transfer">
              <Button size="sm" className="rounded-full px-5">Kirim</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-neutral-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-neutral-900">Transaksi Terakhir</h3>
          <Link to="/dashboard/transactions" className="text-xs text-primary-600 font-medium hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="divide-y divide-neutral-50">
          {TRANSACTIONS.slice(0, 3).map((tx) => (
            <div key={tx.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", tx.type === "in" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                  {tx.type === "in" ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 line-clamp-1">{tx.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{tx.date}</p>
                </div>
              </div>
              <div className={cn("font-sans font-bold text-sm shrink-0", tx.type === "in" ? "text-success" : "text-neutral-900")}>
                {tx.type === "in" ? "+" : "-"}Rp{tx.amount >= 1000000 ? (tx.amount/1000000).toFixed(1) + "M" : (tx.amount/1000) + "k"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserSidebar>
  );
}
