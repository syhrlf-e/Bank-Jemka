import { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
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

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const { response, data } = await fetchApi("/api/transaction/all");
      if (response.ok && data) {
         setTransactions(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
      } else {
        toast.error("Gagal mengambil data transaksi");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    return filter === "all" || tx.transaction_type === filter;
  });

  return (
    <AdminSidebar>
      <div className="mb-8">
        <h1 className="text-heading-lg font-bold text-neutral-900">Riwayat Transaksi</h1>
        <p className="text-body-md text-neutral-500">Log semua mutasi rekening nasabah</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex gap-2">
          <Button variant={filter === "all" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("all")}>Semua</Button>
          <Button variant={filter === "in" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("in")}>Masuk</Button>
          <Button variant={filter === "out" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("out")}>Keluar</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nasabah</TableHead>
              <TableHead>No. Rekening</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead className="text-right">Nominal</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-neutral-500">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-neutral-500">
                  Data transaksi tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx, idx) => (
                <TableRow key={tx.id || idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium text-neutral-900">{tx.name || tx.nama || "-"}</TableCell>
                  <TableCell className="font-sans text-neutral-600">{tx.account_number || tx.acc || "-"}</TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", tx.transaction_type === "in" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                      {tx.transaction_type === "in" ? "Masuk" : "Keluar"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-sans text-neutral-900">
                    Rp {Number(tx.amount || 0).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-neutral-600 text-sm max-w-50 truncate">{tx.description || tx.desc || "-"}</TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", tx.status === "success" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                      {tx.status === "success" ? "Berhasil" : tx.status || "Berhasil"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-600">
                    {tx.created_at ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(tx.created_at)) : (tx.date || "-")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminSidebar>
  );
}
