import { Navbar } from "@/components/layout/navbar";

const features = [
    {
        title: "Operasional Offline",
        desc: "Transaksi tetap berjalan lancar tanpa koneksi internet. Data disinkronkan otomatis saat terhubung kembali.",
        icon: "🔌",
    },
    {
        title: "Manajemen Inventori",
        desc: "Pantau stok secara real-time, atur stok minimum, dan kelola supplier dengan mudah.",
        icon: "📦",
    },
    {
        title: "Laporan Analytics",
        desc: "Dapatkan insight bisnis melalui laporan penjualan harian, mingguan, dan laporan laba rugi.",
        icon: "📊",
    },
    {
        title: "Multi-Metode Pembayaran",
        desc: "Dukung pembayaran Tunai, QRIS, Transfer Bank, dan E-wallet dalam satu sistem.",
        icon: "💳",
    },
    {
        title: "Manajemen Pelanggan",
        desc: "Simpan data pelanggan tetap, riwayat transaksi, dan kelola program loyalitas.",
        icon: "👥",
    },
    {
        title: "Multi-User & Role",
        desc: "Sistem login dengan hak akses berbeda untuk Pemilik, Manajer, dan Kasir.",
        icon: "🔐",
    },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <Navbar />
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Fitur Lengkap untuk Warung Anda</h1>
                        <p className="text-lg text-slate-600">
                            WarungPOS Pro dirancang dengan memahami kebutuhan operasional warung sembako setiap harinya.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                                <div className="text-4xl mb-6">{f.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
