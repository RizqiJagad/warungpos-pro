export default function DashboardOverviewPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Ringkasan Bisnis</h1>
                <div className="bg-white px-4 py-2 rounded-lg border text-sm font-medium text-slate-600">
                    Hari ini: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Pendapatan Hari Ini", value: "Rp 1.250.000", delta: "+12%", icon: "💰", color: "text-emerald-600" },
                    { label: "Transaksi", value: "48", delta: "+5", icon: "🧾", color: "text-blue-600" },
                    { label: "Produk Terjual", value: "156", delta: "Pcs", icon: "📦", color: "text-orange-600" },
                    { label: "Stok Rendah", value: "12", delta: "Barang", icon: "⚠️", color: "text-red-600" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 ${stat.color}`}>{stat.delta}</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="font-bold mb-4">Grafik Penjualan</h3>
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-400">
                        [ Grafik akan muncul di sini ]
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="font-bold mb-4">Barang Terlaris</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Minyak Goreng 1L", sold: "24 Pcs" },
                            { name: "Gula Pasir 1kg", sold: "18 Pcs" },
                            { name: "Beras Premium 5kg", sold: "12 Pcs" },
                            { name: "Telur Ayam (kg)", sold: "10 Pcs" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all cursor-default">
                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                <span className="text-sm font-bold text-teal-600">{item.sold}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
