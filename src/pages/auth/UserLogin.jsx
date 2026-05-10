import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username wajib diisi";
    else if (formData.username.length < 3) newErrors.username = "Minimal 3 karakter";

    if (!formData.password) newErrors.password = "Password wajib diisi";
    else if (formData.password.length < 6) newErrors.password = "Minimal 6 karakter";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-heading-lg font-bold text-neutral-900 mb-2">
          Selamat Datang Kembali
        </h2>
        <p className="text-body-md text-neutral-600">
          Masuk ke akun Bank Jemka Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={errors.username ? "border-danger focus-visible:ring-danger" : ""}
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
              className={errors.password ? "border-danger focus-visible:ring-danger pr-10" : "pr-10"}
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

        <Button type="submit" className="w-full mt-6" disabled={isLoading || !formData.username || !formData.password}>
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <p className="text-center text-body-md text-neutral-600 mt-8">
        Belum punya akun?{" "}
        <Link to="/register" className="text-primary-600 font-medium hover:underline">
          Buka Rekening
        </Link>
      </p>
    </AuthLayout>
  );
}
