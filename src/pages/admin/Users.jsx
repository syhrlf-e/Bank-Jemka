import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const DUMMY_USERS = [
  { id: 1, name: "Rusdi Atmosfir", nik: "3201010101010001", email: "rusdi@gmail.com", phone: "081234567890", kyc: "verified", status: "active" },
  { id: 2, name: "Rehan Tohapok", nik: "3201010101010002", email: "rehan@gmail.com", phone: "081234567891", kyc: "verified", status: "active" },
  { id: 3, name: "Ujang Wonogiri", nik: "3201010101010003", email: "ujang@gmail.com", phone: "081234567892", kyc: "verified", status: "active" },
];

export default function Users() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const filteredUsers = DUMMY_USERS.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.nik.includes(search) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminSidebar>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-heading-lg font-bold text-neutral-900">Kelola Nasabah</h1>
          <p className="text-body-md text-neutral-500">Manajemen data nasabah Bank Jemka</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Nasabah
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 flex items-center gap-2 max-w-sm">
          <Search className="w-5 h-5 text-neutral-400" />
          <Input
            placeholder="Cari nama, NIK, atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>NIK</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, idx) => (
              <TableRow key={user.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium text-neutral-900">{user.name}</TableCell>
                <TableCell className="font-sans text-neutral-600">{user.nik}</TableCell>
                <TableCell>
                  <p className="text-sm text-neutral-900">{user.email}</p>
                  <p className="text-xs text-neutral-500">{user.phone}</p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", user.kyc === "verified" ? "bg-primary-50 text-primary-600" : "bg-warning/10 text-warning")}>
                      {user.kyc === "verified" ? "Verified" : "Pending"}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", user.status === "active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(user)}>
                      <Pencil className="w-4 h-4 text-neutral-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDelete(user)}>
                      <Trash2 className="w-4 h-4 text-danger" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-neutral-500">
                  Data nasabah tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Data Nasabah" : "Tambah Nasabah Baru"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input
                defaultValue={selectedUser?.name || ""}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s']/g, "");
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>NIK</Label>
              <Input
                type="text"
                defaultValue={selectedUser?.nik || ""}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative flex items-center">
                <Input
                  type="text"
                  defaultValue={selectedUser ? selectedUser.email.replace("@gmail.com", "") : ""}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z0-9._-]/g, "");
                  }}
                  className="pr-22.5"
                  placeholder="username"
                />
                <span className="absolute right-3 text-neutral-500 text-sm pointer-events-none">
                  @gmail.com
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>No. Telepon</Label>
              <Input
                type="tel"
                defaultValue={selectedUser?.phone || ""}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 13);
                }}
              />
            </div>
            {!isEditing && (
              <>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={() => setShowModal(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Nasabah</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-body-md text-neutral-600">
              Apakah Anda yakin ingin menghapus nasabah <strong>{selectedUser?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
            <Button variant="destructive" onClick={() => setShowDeleteModal(false)}>Ya, Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminSidebar>
  );
}
