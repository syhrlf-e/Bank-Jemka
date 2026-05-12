import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import UserSidebar from "@/components/layout/UserSidebar";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchApi("/api/profile");
        if (data && data.data) {
          setProfile(data.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        toast.error("Gagal memuat profil");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetchApi("/api/auth/logout", { method: "POST" });
      toast.success("Berhasil keluar akun");
      navigate("/login");
    } catch (error) {
      toast.error("Gagal keluar akun");
    }
  };

  if (isLoading) {
    return (
      <UserSidebar>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-neutral-500">Memuat profil...</p>
        </div>
      </UserSidebar>
    );
  }

  const initial = profile?.nama ? profile.nama.charAt(0).toUpperCase() : "U";
  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Profil Saya</h1>
        <p className="text-body-sm text-neutral-500">Informasi akun Bank Jemka</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-heading-lg mb-4">
          {initial}
        </div>
        <h2 className="text-lg font-bold text-neutral-900">{profile?.nama || "User"}</h2>
        <p className="text-sm font-sans text-neutral-500 mt-1">{profile?.account_number || "-"}</p>
        <div className="mt-4 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
          Status: {profile?.status_user === "active" ? "Active" : "Inactive"} ({profile?.status_kyc === "verified" ? "Verified" : "Unverified"})
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900">Informasi Pribadi</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Username</p>
              <p className="text-sm font-medium text-neutral-900">{profile?.username || "-"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Email</p>
              <p className="text-sm font-medium text-neutral-900">{profile?.email || "-"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">No. Telepon</p>
              <p className="text-sm font-medium text-neutral-900">{profile?.no_telepon || "-"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Tempat Lahir</p>
              <p className="text-sm font-medium text-neutral-900">{profile?.tempat_lahir || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="destructive" className="w-full rounded-xl py-6" onClick={handleLogout}>
        <LogOut className="w-5 h-5 mr-2" />
        Keluar Akun
      </Button>
    </UserSidebar>
  );
}
