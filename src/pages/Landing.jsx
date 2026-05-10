import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center relative z-10 px-8 py-12 max-w-7xl mx-auto w-full gap-12 lg:gap-24">

        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-6">
            <img src="/logo-nama.png" alt="Bank Jemka Logo" className="h-16 object-contain" />
          </div>
          <h1 className="text-heading-xl font-black text-neutral-900 mb-6 leading-tight">
            Masa Depan Keuangan Anda <br className="hidden lg:block"/> Dimulai di Sini.
          </h1>
          <p className="text-body-lg text-neutral-600 mb-10 max-w-lg">
            Sistem informasi perbankan modern yang dirancang untuk memberikan keamanan dan kenyamanan dalam setiap transaksi Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-40" size="lg">
                Login
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-40 bg-white" size="lg">
                Buka Rekening
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-tr from-primary-200 to-primary-100 rounded-3xl rotate-6 scale-105 opacity-50" />
            <img
              src="/hero.webp"
              alt="Bank Jemka Illustration"
              className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>

      </div>

      <footer className="w-full text-center pb-8 pt-4 text-body-sm text-neutral-500 relative z-10">
        &copy; {new Date().getFullYear()} Bank Jemka. Hak Cipta Dilindungi.
      </footer>
    </div>
  );
}
