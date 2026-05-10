import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import UserSidebar from "@/components/layout/UserSidebar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  { id: 1, type: "in", name: "Transfer dari Rehan Tohapok", date: "10 Mei 2026, 14:30", amount: 500000 },
  { id: 2, type: "out", name: "Transfer ke Ujang Wonogiri", date: "09 Mei 2026, 09:15", amount: 150000 },
  { id: 3, type: "in", name: "Setoran Awal", date: "01 Mei 2026, 10:00", amount: 5000000 },
];

export default function UserTransactions() {
  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Riwayat Transaksi</h1>
        <p className="text-body-sm text-neutral-500">Log semua mutasi rekening Anda</p>
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <Input className="pl-9 bg-white border-neutral-200 rounded-xl" placeholder="Cari transaksi..." />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
        <div className="divide-y divide-neutral-50">
          {TRANSACTIONS.map((tx) => (
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
