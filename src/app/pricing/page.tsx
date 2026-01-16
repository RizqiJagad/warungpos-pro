import { Navbar } from "@/components/layout/navbar";

const plans = [
    {
        name: "Gratis",
        price: "Rp 0",
        features: ["Hingga 100 Produk", "Laporan Harian", "1 Akun Kasir", "Offline Mode"],
        cta: "Mulai Sekarang",
        highlight: false,
    },
    {
        name: "Pro",
        price: "Rp 49rb",
        period: "/bulan",
        features: ["Produk Tanpa Batas", "Laporan Laba Rugi", "Multi Kasir", "Manajemen Supplier", "Purchase Orders"],
        cta: "Coba Pro Gratis",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Hubungi Kami",
        features: ["Multi Cabang", "Kustomisasi Sistem", "Prioritas Support", "API Access"],
        cta: "Hubungi Sales",
        highlight: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <Navbar />
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Paket Harga Transparan</h1>
                        <p className="text-lg text-slate-600">Pilih paket yang sesuai dengan skala usaha warung Anda.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((p, i) => (
                            <div key={i} className={`p-8 rounded-3xl border transition-all hover:scale-105 ${p.highlight ? 'bg-slate-900 text-white shadow-2xl scale-105 border-slate-900' : 'bg-white text-slate-900 shadow-lg border-slate-200'}`}>
                                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-bold">{p.price}</span>
                                    {p.period && <span className={p.highlight ? "text-slate-400" : "text-slate-600"}>{p.period}</span>}
                                </div>
                                <ul className="space-y-4 mb-10">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3">
                                            <svg className={`w-5 h-5 ${p.highlight ? 'text-teal-400' : 'text-teal-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            <span className={p.highlight ? "text-slate-300" : "text-slate-600"}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.highlight ? 'bg-teal-600 text-white hover:bg-teal-500' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                                    {p.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
