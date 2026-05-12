import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Send, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import UserSidebar from "@/components/layout/UserSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, txRes, accountRes] = await Promise.all([
          fetchApi("/api/profile"),
          fetchApi("/api/transaction").catch(() => ({ data: { data: [] } })), // ignore tx error for now
          fetchApi("/api/account").catch(() => ({ data: { data: {} } }))
        ]);

        console.log("Profile Response:", profileRes);

        if (profileRes.data && profileRes.data.data) {
          setProfile(profileRes.data.data);
        } else {
          console.warn("No profile data found, redirecting to login. Response:", profileRes.data);
          toast.error(`Sesi tidak valid atau API error (${profileRes.response.status}). Redirecting...`);
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        if (accountRes.data && accountRes.data.data) {
          const accData = accountRes.data.data;
          const currentBalance = accData.balance ?? accData.saldo ?? accData.amount ?? 0;
          setBalance(Number(currentBalance));
        }

        if (txRes.data && txRes.data.data) {
          setTransactions(txRes.data.data);
        }
      } catch (error) {
        console.error("Dashboard Load Error:", error);
        toast.error("Gagal memuat data dari server");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (isLoading) {
    return (
      <UserSidebar>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-neutral-500">Memuat data dashboard...</p>
        </div>
      </UserSidebar>
    );
  }

  const firstName = profile?.nama ? profile.nama.split(" ")[0] : "User";
  const formattedBalance = balance.toLocaleString("id-ID");

  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Halo, {firstName}! 👋</h1>
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
              <p className="text-sm font-sans text-primary-100">{profile?.account_number || "69-000-000"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-primary-100 mb-1">Total Saldo</p>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-sans font-bold tracking-tight">
                  {showBalance ? `Rp ${formattedBalance}` : "Rp ••••••••"}
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
          {transactions.length > 0 ? transactions.slice(0, 3).map((tx) => {
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
            <div className="p-5 text-center text-sm text-neutral-500">Belum ada transaksi.</div>
          )}
        </div>
      </div>
    </UserSidebar>
  );
}
