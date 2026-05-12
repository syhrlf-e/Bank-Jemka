import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchApi } from "@/lib/api";

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedAccount, setGeneratedAccount] = useState("");
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    email: "",
    no_telepon: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama wajib diisi";
    if (!formData.nik) newErrors.nik = "NIK wajib diisi";
    else if (!/^\d{16}$/.test(formData.nik)) newErrors.nik = "NIK harus 16 digit angka";
    if (!formData.tempat_lahir) newErrors.tempat_lahir = "Tempat lahir wajib diisi";
    if (!formData.tanggal_lahir) newErrors.tanggal_lahir = "Tanggal lahir wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid";
    if (!formData.no_telepon) newErrors.no_telepon = "No. Telepon wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username wajib diisi";
    else if (formData.username.length < 3) newErrors.username = "Minimal 3 karakter";
    else if (/\s/.test(formData.username)) newErrors.username = "Username tidak boleh ada spasi";

    if (!formData.password) newErrors.password = "Password wajib diisi";
    else if (formData.password.length < 6) newErrors.password = "Minimal 6 karakter";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;

      const { response, data } = await fetchApi("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok && data.success) {
        setIsSuccess(true);
        setGeneratedAccount(data.data?.account_number || data.account_number || `69-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}`);
        toast.success("Rekening berhasil dibuat!");
      } else {
        toast.error(data.message || "Gagal membuat rekening.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-heading-lg font-bold text-neutral-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-body-md text-neutral-600 mb-6">
            Rekening Bank Jemka Anda telah aktif. Berikut adalah nomor rekening Anda:
          </p>
          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-md mb-8">
            <p className="text-heading-md font-sans font-bold text-primary-600">{generatedAccount}</p>
          </div>
          <Button className="w-full" onClick={() => navigate("/login")}>
            Login Sekarang
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary-600" : "bg-neutral-200"}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary-600" : "bg-neutral-200"}`} />
        </div>
        <h2 className="text-heading-lg font-bold text-neutral-900 mb-2">
          {step === 1 ? "Informasi Pribadi" : "Buat Akun Login"}
        </h2>
        <p className="text-body-md text-neutral-600">
          Langkah {step} dari 2
        </p>
      </div>

      <div className="space-y-4">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s']/g, "");
                  setFormData({ ...formData, nama: value });
                }}
                className={errors.nama ? "border-danger" : ""}
              />
              {errors.nama && <p className="text-body-sm text-danger">{errors.nama}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                type="text"
                value={formData.nik}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setFormData({ ...formData, nik: value });
                }}
                className={errors.nik ? "border-danger" : ""}
              />
              {errors.nik && <p className="text-body-sm text-danger">{errors.nik}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                <Input
                  id="tempat_lahir"
                  value={formData.tempat_lahir}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    setFormData({ ...formData, tempat_lahir: value });
                  }}
                  className={errors.tempat_lahir ? "border-danger" : ""}
                />
                {errors.tempat_lahir && <p className="text-body-sm text-danger">{errors.tempat_lahir}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                <Input
                  id="tanggal_lahir"
                  type="date"
                  value={formData.tanggal_lahir}
                  onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                  className={errors.tanggal_lahir ? "border-danger" : ""}
                />
                {errors.tanggal_lahir && <p className="text-body-sm text-danger">{errors.tanggal_lahir}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative flex items-center">
                <Input
                  id="email"
                  type="text"
                  value={formData.email.replace("@gmail.com", "")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9._-]/g, "");
                    setFormData({ ...formData, email: value ? `${value}@gmail.com` : "" });
                  }}
                  className={errors.email ? "border-danger pr-22.5" : "pr-22.5"}
                  placeholder="username"
                />
                <span className="absolute right-3 text-neutral-500 text-sm pointer-events-none">
                  @gmail.com
                </span>
              </div>
              {errors.email && <p className="text-body-sm text-danger">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="no_telepon">No. Telepon</Label>
              <Input
                id="no_telepon"
                type="tel"
                value={formData.no_telepon}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 13);
                  setFormData({ ...formData, no_telepon: value });
                }}
                className={errors.no_telepon ? "border-danger" : ""}
              />
              {errors.no_telepon && <p className="text-body-sm text-danger">{errors.no_telepon}</p>}
            </div>

            <Button type="button" onClick={handleNext} className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Lanjutkan
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={errors.username ? "border-danger" : ""}
              />
              {errors.username && <p className="text-body-sm text-danger">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={errors.password ? "border-danger pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-body-sm text-danger">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={errors.confirmPassword ? "border-danger pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-body-sm text-danger">{errors.confirmPassword}</p>}
            </div>

            <div className="flex gap-4 mt-6">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                &larr; Kembali
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Memproses..." : "Buat Rekening"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {step === 1 && (
        <p className="text-center text-body-md text-neutral-600 mt-8">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
