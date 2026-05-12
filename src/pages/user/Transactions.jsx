import { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import UserSidebar from "@/components/layout/UserSidebar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function UserTransactions() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const txRes = await fetchApi("/api/transaction");
        if (txRes.data && txRes.data.data) {
          setTransactions(txRes.data.data);
        }
      } catch (error) {
        toast.error("Gagal memuat riwayat transaksi");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredTransactions = transactions.filter(tx => 
    (tx.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Riwayat Transaksi</h1>
        <p className="text-body-sm text-neutral-500">Log semua mutasi rekening Anda</p>
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <Input 
          className="pl-9 bg-white border-neutral-200 rounded-xl" 
          placeholder="Cari transaksi..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
        <div className="divide-y divide-neutral-50">
          {isLoading ? (
            <div className="p-5 text-center text-sm text-neutral-500">Memuat riwayat transaksi...</div>
          ) : filteredTransactions.length > 0 ? filteredTransactions.map((tx) => {
            const isDebit = tx.transaction_type === "debit";
            const amountStr = String(tx.amount);
            const amountNum = Number(amountStr);
            const formattedAmount = amountNum >= 1000000 ? (amountNum/1000000).toFixed(1) + "M" : (amountNum >= 1000 ? (amountNum/1000) + "k" : amountNum);
            
            return (
              <div key={tx.id} className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", !isDebit ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                    {!isDebit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 line-clamp-1">{tx.description || "Transaksi"}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(tx.created_at))}</p>
                  </div>
                </div>
                <div className={cn("font-sans font-bold text-sm shrink-0", !isDebit ? "text-success" : "text-neutral-900")}>
                  {!isDebit ? "+" : "-"}Rp{formattedAmount}
                </div>
              </div>
            );
          }) : (
            <div className="p-5 text-center text-sm text-neutral-500">Tidak ada transaksi ditemukan.</div>
          )}
        </div>
      </div>
    </UserSidebar>
  );
}
