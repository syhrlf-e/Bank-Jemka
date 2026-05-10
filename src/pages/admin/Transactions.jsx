import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  { id: 1, name: "Rusdi Atmosfir", acc: "69-222-896", type: "in", amount: 5000000, desc: "Setoran Awal", status: "success", date: "01 Mei 2026, 10:00" },
  { id: 2, name: "Rehan Tohapok", acc: "69-254-888", type: "in", amount: 1000000, desc: "Setoran Awal", status: "success", date: "02 Mei 2026, 11:30" },
  { id: 3, name: "Ujang Wonogiri", acc: "69-333-769", type: "in", amount: 50000, desc: "Setoran Awal", status: "success", date: "03 Mei 2026, 14:15" },
  { id: 4, name: "Rusdi Atmosfir", acc: "69-222-896", type: "out", amount: 150000, desc: "Transfer ke Ujang", status: "success", date: "09 Mei 2026, 09:15" },
  { id: 5, name: "Ujang Wonogiri", acc: "69-333-769", type: "in", amount: 150000, desc: "Transfer dari Rusdi", status: "success", date: "09 Mei 2026, 09:15" },
  { id: 6, name: "Rehan Tohapok", acc: "69-254-888", type: "out", amount: 500000, desc: "Transfer ke Rusdi", status: "success", date: "10 Mei 2026, 14:30" },
  { id: 7, name: "Rusdi Atmosfir", acc: "69-222-896", type: "in", amount: 500000, desc: "Transfer dari Rehan", status: "success", date: "10 Mei 2026, 14:30" },
];

export default function Transactions() {
  const [filter, setFilter] = useState("all");

  const filteredTransactions = TRANSACTIONS.filter((tx) => {
    return filter === "all" || tx.type === filter;
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
            {filteredTransactions.map((tx, idx) => (
              <TableRow key={tx.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium text-neutral-900">{tx.name}</TableCell>
                <TableCell className="font-sans text-neutral-600">{tx.acc}</TableCell>
                <TableCell>
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", tx.type === "in" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                    {tx.type === "in" ? "Masuk" : "Keluar"}
                  </span>
                </TableCell>
                <TableCell className="text-right font-sans text-neutral-900">
                  Rp {tx.amount.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-neutral-600 text-sm max-w-50 truncate">{tx.desc}</TableCell>
                <TableCell>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", tx.status === "success" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                    {tx.status === "success" ? "Berhasil" : "Gagal"}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-neutral-600">{tx.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminSidebar>
  );
}
