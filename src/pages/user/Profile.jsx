import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import UserSidebar from "@/components/layout/UserSidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UserProfile() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState({});

  const handleLogout = async () => {
    const request = await fetch(`${apiUrl}/api/auth/logout`, { method: "POST" });
    const response = await request.json();
    if (response.status) {
      navigate("/login");
    }
  };

  const loadUserData = async () => {
    const request = await fetch(`${apiUrl}/api/profile`, { method: "POST" });
    const response = await request.json();
    if (response.success);
  }

  return (
    <UserSidebar>
      <div className="mb-6">
        <h1 className="text-heading-md font-bold text-neutral-900">Profil Saya</h1>
        <p className="text-body-sm text-neutral-500">Informasi akun Bank Jemka</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-heading-lg mb-4">
          RA
        </div>
        <h2 className="text-lg font-bold text-neutral-900">Rusdi Atmosfir</h2>
        <p className="text-sm font-sans text-neutral-500 mt-1">69-222-896</p>
        <div className="mt-4 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
          Status: Active (Verified)
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
              <p className="text-sm font-medium text-neutral-900">rusdi_atmosfir</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Email</p>
              <p className="text-sm font-medium text-neutral-900">rusdi@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">No. Telepon</p>
              <p className="text-sm font-medium text-neutral-900">081234567890</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-xs text-neutral-500">Tempat Lahir</p>
              <p className="text-sm font-medium text-neutral-900">Jemka</p>
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
