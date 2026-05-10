import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import UserSidebar from "@/components/layout/UserSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DUMMY_ACCOUNTS = [
  { id: 1, name: "Rehan Tohapok", account_number: "69-254-888" },
  { id: 2, name: "Ujang Wonogiri", account_number: "69-333-769" },
];

export default function Transfer() {
  const [formData, setFormData] = useState({
    destination: "",
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, amount: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.destination) newErrors.destination = "Pilih rekening tujuan";
    if (!formData.amount) newErrors.amount = "Nominal wajib diisi";
    else if (parseInt(formData.amount) < 1000) newErrors.amount = "Minimal transfer Rp 1.000";
    else if (parseInt(formData.amount) > 5000000) newErrors.amount = "Saldo tidak mencukupi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validate()) {
      setShowConfirm(true);
    }
  };

  const handleTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setShowConfirm(false);
      setIsSuccess(true);
      toast.success("Transfer berhasil!", {
        description: `Dana Rp ${formattedAmount} telah dikirim.`
      });
    }, 1500);
  };

  const selectedAccount = DUMMY_ACCOUNTS.find(a => a.account_number === formData.destination);
  const formattedAmount = formData.amount ? parseInt(formData.amount).toLocaleString("id-ID") : "0";

  if (isSuccess) {
    return (
      <UserSidebar>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
          <CheckCircle2 className="w-24 h-24 text-success mb-6" />
          <h2 className="text-heading-xl font-bold text-neutral-900 mb-2">Transfer Berhasil!</h2>
          <p className="text-body-md text-neutral-600 mb-8">
            Dana sebesar <span className="font-bold text-neutral-900">Rp {formattedAmount}</span> telah berhasil dikirim ke <span className="font-bold text-neutral-900">{selectedAccount?.name}</span>.
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 w-full mb-8 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-500">Nomor Referensi</span>
              <span className="font-sans text-neutral-900">TRX-{Math.floor(Math.random() * 1000000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Waktu</span>
              <span className="text-neutral-900">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date())}</span>
            </div>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Kembali ke Dashboard
          </Button>
        </div>
      </UserSidebar>
    );
  }

  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Transfer Dana</h1>
        <p className="text-sm text-neutral-500">
          Kirim uang ke rekening lain
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-primary-50 rounded-2xl border border-primary-100 p-5">
          <h3 className="text-sm font-bold text-primary-900 mb-5">Preview Transfer</h3>

          <div className="space-y-5 relative">
            <div className="absolute left-5 top-10 h-5 w-px bg-transparent border-dashed border-l-2 border-primary-300" />

            <div className="flex gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                RA
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-primary-600 font-medium mb-0.5">Dari Rekening</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-neutral-900 line-clamp-1">Rusdi Atmosfir</p>
                  <span className="text-xs text-neutral-300">•</span>
                  <p className="text-xs font-sans text-neutral-500">69-222-896</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-primary-200 text-primary-600 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-primary-600 font-medium mb-0.5">Rekening Tujuan</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-neutral-900 line-clamp-1">{selectedAccount ? selectedAccount.name : "Pilih Rekening"}</p>
                  {selectedAccount && <span className="text-xs text-neutral-300">•</span>}
                  <p className="text-xs font-sans text-neutral-500">{selectedAccount ? selectedAccount.account_number : ""}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-primary-200/60 space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Keterangan</span>
                <span className="text-sm text-neutral-900 font-medium text-right max-w-37.5 truncate">{formData.description || "-"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Nominal</span>
                <span className="font-sans font-bold text-sm text-neutral-900">Rp {formattedAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Biaya Admin</span>
                <span className="font-sans text-xs font-bold text-success">Gratis</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-primary-200/60 mt-2">
                <span className="font-bold text-sm text-neutral-900">Total</span>
                <span className="text-lg font-sans font-bold text-primary-600">Rp {formattedAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm">Rekening Tujuan</Label>
              <Select value={formData.destination} onValueChange={(val) => setFormData({ ...formData, destination: val })}>
                <SelectTrigger className={errors.destination ? "border-danger rounded-xl h-12" : "rounded-xl h-12"}>
                  <SelectValue placeholder="Pilih rekening tujuan" className="text-sm" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {DUMMY_ACCOUNTS.map((acc) => (
                    <SelectItem key={acc.id} value={acc.account_number} className="text-sm">
                      {acc.name} - {acc.account_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.destination && <p className="text-xs text-danger">{errors.destination}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Nominal Transfer (Rp)</Label>
              <Input
                type="text"
                value={formData.amount ? Number(formData.amount).toLocaleString("id-ID") : ""}
                onChange={handleAmountChange}
                placeholder="1.000"
                className={errors.amount ? "border-danger text-lg font-sans rounded-xl h-12" : "text-lg font-sans rounded-xl h-12"}
              />
              {errors.amount && <p className="text-xs text-danger">{errors.amount}</p>}
              <p className="text-xs text-neutral-500">Saldo tersedia: Rp 5.000.000</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Keterangan (Opsional)</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Bayar hutang / Patungan makan"
                className="rounded-xl h-12 text-sm"
              />
            </div>

            <Button onClick={handlePreview} className="w-full rounded-xl mt-4 h-12 text-sm font-bold" size="lg">
              Lanjut
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Transfer</DialogTitle>
            <DialogDescription>
              Pastikan data transfer di bawah ini sudah benar.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-neutral-50 p-4 rounded-lg space-y-3 my-4">
            <div className="flex justify-between">
              <span className="text-neutral-500 text-sm">Penerima</span>
              <span className="font-bold text-neutral-900 text-sm">{selectedAccount?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 text-sm">No. Rekening</span>
              <span className="font-sans text-neutral-900 text-sm">{selectedAccount?.account_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 text-sm">Nominal</span>
              <span className="font-sans font-bold text-neutral-900 text-sm">Rp {formattedAmount}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-3 mt-3">
              <span className="font-bold text-neutral-900 text-sm">Total Potongan</span>
              <span className="font-sans font-bold text-danger text-sm">Rp {formattedAmount}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConfirm(false)} disabled={isTransferring}>
              Batal
            </Button>
            <Button onClick={handleTransfer} disabled={isTransferring}>
              {isTransferring ? "Memproses..." : "Ya, Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UserSidebar>
  );
}
