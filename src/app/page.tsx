import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-teal-100 text-teal-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            Baru: WarungPOS Pro v1.0 🎉
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Kasir Warung Jadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Lebih Cepat</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
            Solusi POS cerdas yang bekerja offline & online. Dirancang khusus untuk warung sembako dan kelontong agar manajemen stok dan transaksi jadi lebih efisien.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl">
              Coba Gratis Sekarang
            </Link>
            <Link href="/download" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all shadow-md">
              Install Aplikasi (PWA)
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Fitur Utama WarungPOS Pro</h2>
            <p className="text-slate-600">Segala yang Anda butuhkan untuk mengelola warung dalam satu aplikasi.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Transaksi Offline</h3>
              <p className="text-slate-600">Tetap bisa jualan meski internet mati. Data otomatis sinkron saat kembali online.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Manajemen Stok</h3>
              <p className="text-slate-600">Pantau stok barang real-time. Dapatkan notifikasi jika stok barang tertentu mulai menipis.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Laporan Laba Rugi</h3>
              <p className="text-slate-600">Analisis keuntungan harimu dengan laporan penjualan yang otomatis dan akurat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t bg-slate-900 text-slate-400">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 WarungPOS Pro. Dibangun dengan ❤️ untuk UMKM Indonesia.</p>
        </div>
      </footer>
    </div>
  );
}
