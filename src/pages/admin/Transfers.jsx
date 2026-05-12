import { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    setIsLoading(true);
    try {
      const { response, data } = await fetchApi("/api/transfer/all");
      if (response.ok && data) {
        setTransfers(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
      } else {
        toast.error("Gagal mengambil data transfer");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransfers = transfers.filter((tf) =>
    (tf.from_name || tf.source_name || tf.sender_name || tf.pengirim_nama || "").toLowerCase().includes(search.toLowerCase()) ||
    (tf.from_acc || tf.source_account_number || tf.source_account || tf.sender_account || tf.rekening_sumber || "").includes(search) ||
    (tf.to_name || tf.destination_name || tf.receiver_name || tf.penerima_nama || "").toLowerCase().includes(search.toLowerCase()) ||
    (tf.to_acc || tf.destination_account_number || tf.destination_account || tf.receiver_account || tf.rekening_tujuan || "").includes(search)
  );

  return (
    <AdminSidebar>
      <div className="mb-8">
        <h1 className="text-heading-lg font-bold text-neutral-900">Riwayat Transfer</h1>
        <p className="text-body-md text-neutral-500">Semua transaksi transfer antar rekening</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex items-center gap-2 max-w-sm">
          <Search className="w-5 h-5 text-neutral-400" />
          <Input
            placeholder="Cari nama atau nomor rekening..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Dari (Pengirim)</TableHead>
              <TableHead>Ke (Penerima)</TableHead>
              <TableHead className="text-right">Nominal</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-neutral-500">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : filteredTransfers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-neutral-500">
                  Data transfer tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransfers.map((tf, idx) => (
                <TableRow key={tf.id || idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <p className="font-medium text-neutral-900">{tf.from_name || tf.source_name || tf.sender_name || tf.pengirim_nama || "-"}</p>
                    <p className="text-xs font-sans text-neutral-500">{tf.from_acc || tf.source_account_number || tf.source_account || tf.sender_account || tf.rekening_sumber || "-"}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-neutral-900">{tf.to_name || tf.destination_name || tf.receiver_name || tf.penerima_nama || "-"}</p>
                    <p className="text-xs font-sans text-neutral-500">{tf.to_acc || tf.destination_account_number || tf.destination_account || tf.receiver_account || tf.rekening_tujuan || "-"}</p>
                  </TableCell>
                  <TableCell className="text-right font-sans text-neutral-600">
                    Rp {Number(tf.amount || 0).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right font-sans font-bold text-neutral-900">
                    Rp {Number(tf.total_amount || tf.total || tf.amount || 0).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", (tf.status === "success" || tf.status_transfer === "success") ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                      {(tf.status === "success" || tf.status_transfer === "success") ? "Berhasil" : (tf.status_transfer || tf.status || "Berhasil")}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-600">
                    {tf.created_at ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(tf.created_at)) : (tf.date || "-")}
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
