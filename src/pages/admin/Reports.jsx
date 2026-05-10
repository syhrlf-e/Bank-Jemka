import AdminSidebar from "@/components/layout/AdminSidebar";
import { Users, CreditCard, Banknote, ArrowLeftRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  return (
    <AdminSidebar>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-heading-lg font-bold text-neutral-900">Laporan & Statistik</h1>
          <p className="text-body-md text-neutral-500">Ringkasan data operasional Bank Jemka</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-heading-md font-bold text-neutral-900 mb-4">Statistik Ringkasan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-2 text-neutral-500">
                <Users className="w-5 h-5" />
                <span className="font-medium text-sm">Total Nasabah</span>
              </div>
              <p className="text-heading-lg font-bold text-neutral-900">3</p>
              <p className="text-body-sm text-success mt-2">+3 bulan ini</p>
            </div>
            
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-2 text-neutral-500">
                <CreditCard className="w-5 h-5" />
                <span className="font-medium text-sm">Rekening Aktif</span>
              </div>
              <p className="text-heading-lg font-bold text-neutral-900">3</p>
              <p className="text-body-sm text-neutral-400 mt-2">0 nonaktif</p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-2 text-neutral-500">
                <Banknote className="w-5 h-5" />
                <span className="font-medium text-sm">Total Dana</span>
              </div>
              <p className="text-heading-md font-bold text-neutral-900 font-sans mt-1">Rp 6.050.000</p>
              <p className="text-body-sm text-success mt-2">+ Rp 6.05M masuk</p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-2 text-neutral-500">
                <ArrowLeftRight className="w-5 h-5" />
                <span className="font-medium text-sm">Volume Transfer</span>
              </div>
              <p className="text-heading-lg font-bold text-neutral-900">2</p>
              <p className="text-body-sm text-neutral-500 mt-2 font-sans">Rp 650.000</p>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
            <h3 className="text-heading-md font-bold text-neutral-900 mb-4">Laporan Nasabah & Saldo</h3>
            <div className="overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-neutral-50 border-y border-neutral-200 text-neutral-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Nama Nasabah</th>
                    <th className="px-4 py-3 font-medium">No. Rekening</th>
                    <th className="px-4 py-3 font-medium text-right">Saldo Saat Ini</th>
                    <th className="px-4 py-3 font-medium">Status Rekening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">Rusdi Atmosfir</td>
                    <td className="px-4 py-3 font-sans text-neutral-500">69-222-896</td>
                    <td className="px-4 py-3 font-sans text-right font-medium">Rp 5.350.000</td>
                    <td className="px-4 py-3 text-success">Aktif</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">Rehan Tohapok</td>
                    <td className="px-4 py-3 font-sans text-neutral-500">69-254-888</td>
                    <td className="px-4 py-3 font-sans text-right font-medium">Rp 500.000</td>
                    <td className="px-4 py-3 text-success">Aktif</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">Ujang Wonogiri</td>
                    <td className="px-4 py-3 font-sans text-neutral-500">69-333-769</td>
                    <td className="px-4 py-3 font-sans text-right font-medium">Rp 200.000</td>
                    <td className="px-4 py-3 text-success">Aktif</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </AdminSidebar>
  );
}
