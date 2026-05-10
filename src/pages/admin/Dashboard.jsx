import AdminSidebar from "@/components/layout/AdminSidebar";
import { Users, CreditCard, Banknote, ArrowLeftRight } from "lucide-react";
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
  { id: 1, name: "Rusdi Atmosfir", type: "in", amount: 5000000, status: "success", date: "10 Mei 2026" },
  { id: 2, name: "Rehan Tohapok", type: "in", amount: 1000000, status: "success", date: "10 Mei 2026" },
  { id: 3, name: "Ujang Wonogiri", type: "out", amount: 150000, status: "success", date: "09 Mei 2026" },
];

const TRANSFERS = [
  { id: 1, from: "Rusdi Atmosfir", to: "Ujang Wonogiri", amount: 150000, status: "success", date: "09 Mei 2026" },
  { id: 2, from: "Rehan Tohapok", to: "Rusdi Atmosfir", amount: 500000, status: "success", date: "10 Mei 2026" },
];

export default function AdminDashboard() {
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
            <p className="text-heading-lg font-bold text-neutral-900">3</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Rekening Aktif</p>
            <p className="text-heading-lg font-bold text-neutral-900">3</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Total Saldo</p>
            <p className="text-heading-md font-bold text-neutral-900 font-sans">Rp 6.05M</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-body-sm text-neutral-500 font-medium">Total Transfer</p>
            <p className="text-heading-lg font-bold text-neutral-900">2</p>
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
              {TRANSACTIONS.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-neutral-900">{tx.name}</TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", tx.type === "in" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                      {tx.type === "in" ? "Masuk" : "Keluar"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-sans text-neutral-600">
                    Rp {tx.amount.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
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
              {TRANSFERS.map((tf) => (
                <TableRow key={tf.id}>
                  <TableCell className="font-medium text-neutral-900">{tf.from}</TableCell>
                  <TableCell className="font-medium text-neutral-900">{tf.to}</TableCell>
                  <TableCell className="text-right font-sans text-neutral-600">
                    Rp {tf.amount.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminSidebar>
  );
}
