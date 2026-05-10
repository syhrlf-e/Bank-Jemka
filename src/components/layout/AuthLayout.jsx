export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-neutral-0">
      <div className="hidden lg:flex w-[40%] flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero.webp" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/40" />
          <div className="absolute inset-0 bg-linear-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <img src="/logo-nama.png" alt="Bank Jemka Logo" className="h-12 object-contain brightness-0 invert" />
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-heading-xl font-black mb-4">
            Masa Depan Keuangan Anda Dimulai di Sini.
          </h1>
          <p className="text-body-md opacity-90">
            Sistem perbankan modern yang dirancang untuk memberikan keamanan dan kenyamanan dalam setiap transaksi Anda.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
