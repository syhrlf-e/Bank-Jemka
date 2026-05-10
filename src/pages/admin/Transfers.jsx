import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const TRANSFERS = [
  { id: 1, from_name: "Rusdi Atmosfir", from_acc: "69-222-896", to_name: "Ujang Wonogiri", to_acc: "69-333-769", amount: 150000, total: 150000, status: "success", date: "09 Mei 2026, 09:15" },
  { id: 2, from_name: "Rehan Tohapok", from_acc: "69-254-888", to_name: "Rusdi Atmosfir", to_acc: "69-222-896", amount: 500000, total: 500000, status: "success", date: "10 Mei 2026, 14:30" },
];

export default function Transfers() {
  const [search, setSearch] = useState("");

  const filteredTransfers = TRANSFERS.filter((tf) =>
    tf.from_name.toLowerCase().includes(search.toLowerCase()) ||
    tf.from_acc.includes(search) ||
    tf.to_name.toLowerCase().includes(search.toLowerCase()) ||
    tf.to_acc.includes(search)
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
            {filteredTransfers.map((tf, idx) => (
              <TableRow key={tf.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <p className="font-medium text-neutral-900">{tf.from_name}</p>
                  <p className="text-xs font-sans text-neutral-500">{tf.from_acc}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-neutral-900">{tf.to_name}</p>
                  <p className="text-xs font-sans text-neutral-500">{tf.to_acc}</p>
                </TableCell>
                <TableCell className="text-right font-sans text-neutral-600">
                  Rp {tf.amount.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right font-sans font-bold text-neutral-900">
                  Rp {tf.total.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", tf.status === "success" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                    {tf.status === "success" ? "Berhasil" : "Gagal"}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-neutral-600">{tf.date}</TableCell>
              </TableRow>
            ))}
            {filteredTransfers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-neutral-500">
                  Data transfer tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminSidebar>
  );
}
