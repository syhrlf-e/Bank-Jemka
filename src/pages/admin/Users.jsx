import { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    no_telepon: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { response, data } = await fetchApi("/api/profile/all");
      if (response.ok && data.status !== false) {
        setUsers(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
      } else {
        toast.error("Gagal mengambil data nasabah");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setFormData({ nama: "", nik: "", email: "", no_telepon: "", username: "", password: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setFormData({
      nama: user.nama || "",
      nik: user.nik || "",
      email: user.email || "",
      no_telepon: user.no_telepon || "",
      username: "", // Usually don't edit username/password here unless requested
      password: "",
    });
    setShowModal(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Menyiapkan payload, jika email diisi tapi tanpa @gmail.com, kita tambahkan otomatis (berdasarkan UI)
      const payload = { ...formData };
      if (payload.email && !payload.email.includes("@")) {
        payload.email = `${payload.email}@gmail.com`;
      }

      let endpoint = "/api/auth/register"; // Asumsi endpoint tambah nasabah mirip dengan register
      let method = "POST";

      if (isEditing) {
        // Asumsi endpoint update profile berdasarkan ID nasabah
        // GANTI INI JIKA ENDPOINT-NYA BERBEDA
        endpoint = `/api/profile/${selectedUser.id_account}`; 
        method = "PUT";
        // Hapus password jika kosong saat edit
        if (!payload.password) delete payload.password;
        if (!payload.username) delete payload.username;
      }

      const { response, data } = await fetchApi(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(isEditing ? "Data nasabah berhasil diperbarui!" : "Nasabah berhasil ditambahkan!");
        setShowModal(false);
        fetchUsers(); // Refresh data
      } else {
        toast.error(data.message || "Gagal menyimpan data nasabah.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      // Asumsi endpoint delete profile berdasarkan ID nasabah
      // GANTI INI JIKA ENDPOINT-NYA BERBEDA
      const { response, data } = await fetchApi(`/api/profile/${selectedUser.id_account}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Nasabah berhasil dihapus!");
        setShowDeleteModal(false);
        fetchUsers(); // Refresh data
      } else {
        toast.error(data.message || "Gagal menghapus nasabah.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    String(user.nama || "").toLowerCase().includes(search.toLowerCase()) ||
    String(user.nik || "").includes(search) ||
    String(user.email || "").toLowerCase().includes(search.toLowerCase())
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-neutral-500">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-neutral-500">
                  Data nasabah tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, idx) => (
                <TableRow key={user.id_account || idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium text-neutral-900">{user.nama}</TableCell>
                  <TableCell className="font-sans text-neutral-600">{user.nik}</TableCell>
                  <TableCell>
                    <p className="text-sm text-neutral-900">{user.email}</p>
                    <p className="text-xs text-neutral-500">{user.no_telepon}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", user.status_kyc === "verified" ? "bg-primary-50 text-primary-600" : "bg-warning/10 text-warning")}>
                        {user.status_kyc === "verified" ? "Verified" : "Pending"}
                      </span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", user.status_user === "active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                        {user.status_user === "active" ? "Active" : "Inactive"}
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
              ))
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
                value={formData.nama}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-Z\s']/g, "");
                  setFormData({ ...formData, nama: val });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>NIK</Label>
              <Input
                type="text"
                value={formData.nik}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setFormData({ ...formData, nik: val });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative flex items-center">
                <Input
                  type="text"
                  value={formData.email.replace("@gmail.com", "")}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z0-9._-]/g, "");
                    setFormData({ ...formData, email: val });
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
                value={formData.no_telepon}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 13);
                  setFormData({ ...formData, no_telepon: val });
                }}
              />
            </div>
            {!isEditing && (
              <>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input 
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)} disabled={isSubmitting}>Batal</Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
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
              Apakah Anda yakin ingin menghapus nasabah <strong>{selectedUser?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isSubmitting}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? "Menghapus..." : "Ya, Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminSidebar>
  );
}
