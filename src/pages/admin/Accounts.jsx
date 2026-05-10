import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const DUMMY_ACCOUNTS = [
  { id: 1, account_number: "69-222-896", name: "Rusdi Atmosfir", type: "Tabungan", balance: 5000000, status: "active" },
  { id: 2, account_number: "69-254-888", name: "Rehan Tohapok", type: "Tabungan", balance: 1000000, status: "active" },
  { id: 3, account_number: "69-333-769", name: "Ujang Wonogiri", type: "Tabungan", balance: 50000, status: "active" },
];

export default function Accounts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleToggleStatus = (acc) => {
    setSelectedAccount(acc);
    setShowStatusModal(true);
  };

  const filteredAccounts = DUMMY_ACCOUNTS.filter((acc) => {
    const matchesSearch = acc.name.toLowerCase().includes(search.toLowerCase()) || acc.account_number.includes(search);
    const matchesFilter = filter === "all" || acc.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminSidebar>
      <div className="mb-8">
        <h1 className="text-heading-lg font-bold text-neutral-900">Kelola Rekening</h1>
        <p className="text-body-md text-neutral-500">Manajemen data rekening nasabah</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:max-w-sm">
            <Search className="w-5 h-5 text-neutral-400" />
            <Input
              placeholder="Cari nomor rekening atau nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant={filter === "all" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("all")}>Semua</Button>
            <Button variant={filter === "active" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("active")}>Aktif</Button>
            <Button variant={filter === "inactive" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("inactive")}>Nonaktif</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nomor Rekening</TableHead>
              <TableHead>Nama Pemilik</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead className="text-right">Saldo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((acc, idx) => (
              <TableRow key={acc.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-sans text-neutral-900 font-medium">{acc.account_number}</TableCell>
                <TableCell>{acc.name}</TableCell>
                <TableCell>{acc.type}</TableCell>
                <TableCell className="text-right font-sans text-neutral-600">
                  Rp {acc.balance.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", acc.status === "active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                    {acc.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(acc)} className={acc.status === "active" ? "text-danger hover:text-danger hover:bg-danger/10" : "text-success hover:text-success hover:bg-success/10"}>
                    {acc.status === "active" ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    {acc.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredAccounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-neutral-500">
                  Data rekening tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Perubahan Status</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-body-md text-neutral-600">
              Apakah Anda yakin ingin {selectedAccount?.status === "active" ? "menonaktifkan" : "mengaktifkan"} rekening <strong>{selectedAccount?.account_number}</strong> atas nama <strong>{selectedAccount?.name}</strong>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}>Batal</Button>
            <Button onClick={() => setShowStatusModal(false)}>Ya, Lanjutkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminSidebar>
  );
}
