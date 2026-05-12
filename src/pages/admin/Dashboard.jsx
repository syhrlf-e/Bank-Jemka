import { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Users, CreditCard, Banknote, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAccounts: 0,
    totalBalance: 0,
    totalTransfers: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch data secara pararel (bersamaan) untuk performa lebih baik
        const [usersRes, transfersRes, transactionsRes] = await Promise.all([
          fetchApi("/api/profile/all").catch(() => ({ data: { data: [] } })),
          fetchApi("/api/transfer/all").catch(() => ({ data: { data: [] } })),
          fetchApi("/api/transaction/all").catch(() => ({ data: { data: [] } }))
        ]);

        // Ekstrak Array dari response yang bersarang (data.data)
        const usersData = Array.isArray(usersRes.data?.data) ? usersRes.data.data : (Array.isArray(usersRes.data) ? usersRes.data : []);
        const transfersData = Array.isArray(transfersRes.data?.data) ? transfersRes.data.data : (Array.isArray(transfersRes.data) ? transfersRes.data : []);
        const transactionsData = Array.isArray(transactionsRes.data?.data) ? transactionsRes.data.data : (Array.isArray(transactionsRes.data) ? transactionsRes.data : []);

        // Kalkulasi Statistik
        const activeUsers = usersData.filter(u => u.status_user === "active" || u.status === "active").length;

        let calculatedTotalBalance = 0;
        transactionsData.forEach(tx => {
           if (tx.transaction_type === "in" || tx.transaction_type === "credit") calculatedTotalBalance += Number(tx.amount || 0);
        });

        setStats({
          totalUsers: usersData.length,
          activeAccounts: activeUsers || usersData.length, // Fallback
          totalBalance: calculatedTotalBalance, 
          totalTransfers: transfersData.length,
        });

        // Ambil 5 terbaru
        setRecentTransactions(transactionsData.slice(0, 5));
        setRecentTransfers(transfersData.slice(0, 5));

      } catch (error) {
        toast.error("Gagal memuat sebagian data dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatShortCurrency = (amount) => {
    if (!amount) return "Rp 0";
    if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(2)}M`;
    if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(2)}Jt`;
    if (amount >= 1000) return `Rp ${(amount / 1000).toFixed(1)}Rb`;
    return `Rp ${amount}`;
  };

  return (
    <AdminSidebar>
      <div className="mb-8">
        <h1 className="text-heading-lg font-bold text-neutral-900">Dashboard Administrator</h1>
        <p className="text-body-md text-neutral-500">Ringkasan sistem Bank Jemka</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Total Nasabah</p>
            <p className="text-heading-lg font-bold text-neutral-900">
              {isLoading ? "..." : stats.totalUsers}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Rekening Aktif</p>
            <p className="text-heading-lg font-bold text-neutral-900">
              {isLoading ? "..." : stats.activeAccounts}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Total Saldo</p>
            <p className="text-heading-md font-bold text-neutral-900 font-sans">
              {isLoading ? "..." : formatShortCurrency(stats.totalBalance)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Total Transfer</p>
            <p className="text-heading-lg font-bold text-neutral-900">
              {isLoading ? "..." : stats.totalTransfers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-heading-md font-bold text-neutral-900">Transaksi Terbaru</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nasabah</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-neutral-500">Memuat data...</TableCell>
                </TableRow>
              ) : recentTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-neutral-500">Belum ada transaksi.</TableCell>
                </TableRow>
              ) : (
                recentTransactions.map((tx, idx) => (
                  <TableRow key={tx.id || idx}>
                    <TableCell className="font-medium text-neutral-900">
                      {tx.name || tx.nama || tx.account_number || "-"}
                    </TableCell>
                    <TableCell>
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", tx.transaction_type === "in" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                        {tx.transaction_type === "in" ? "Masuk" : "Keluar"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-sans text-neutral-600">
                      {formatCurrency(tx.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-heading-md font-bold text-neutral-900">Transfer Terbaru</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dari</TableHead>
                <TableHead>Ke</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-neutral-500">Memuat data...</TableCell>
                </TableRow>
              ) : recentTransfers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-neutral-500">Belum ada transfer.</TableCell>
                </TableRow>
              ) : (
                recentTransfers.map((tf, idx) => (
                  <TableRow key={tf.id || idx}>
                    <TableCell className="font-medium text-neutral-900">
                       {typeof tf.source === 'object' ? (tf.source?.nama || tf.source?.account_number || "-") : (tf.source || tf.from_name || "-")}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-900">
                       {typeof tf.destination === 'object' ? (tf.destination?.nama || tf.destination?.account_number || "-") : (tf.destination || tf.to_name || "-")}
                    </TableCell>
                    <TableCell className="text-right font-sans text-neutral-600">
                      {formatCurrency(tf.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminSidebar>
  );
}
