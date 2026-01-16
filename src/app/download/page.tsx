import { Navbar } from "@/components/layout/navbar";

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <Navbar />
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">Instal WarungPOS Pro</h1>
                    <p className="text-center text-slate-600 mb-12 text-lg">
                        WarungPOS Pro adalah Progressive Web App (PWA). Anda dapat menginstalnya di perangkat apapun tanpa perlu melalui App Store atau Play Store.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-md border">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="bg-slate-100 p-2 rounded-lg">📱</span> Android & Desktop
                            </h2>
                            <ol className="space-y-4 text-slate-600 list-decimal list-inside">
                                <li>Buka situs ini di browser (Chrome direkomendasikan).</li>
                                <li>Klik tombol <span className="font-bold text-slate-900">"Add to Home Screen"</span> atau ikon instal di bilah alamat.</li>
                                <li>Konfirmasi instalasi.</li>
                                <li>Aplikasi akan muncul di layar utama atau daftar aplikasi Anda.</li>
                            </ol>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md border">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="bg-slate-100 p-2 rounded-lg">🍎</span> iOS (iPhone/iPad)
                            </h2>
                            <ol className="space-y-4 text-slate-600 list-decimal list-inside">
                                <li>Buka situs ini di browser <span className="font-bold text-slate-900">Safari</span>.</li>
                                <li>Tap ikon <span className="font-bold text-slate-900">"Share"</span> (kotak dengan panah ke atas).</li>
                                <li>Gulir ke bawah dan pilih <span className="font-bold text-slate-900">"Add to Home Screen"</span>.</li>
                                <li>Tap <span className="font-bold text-slate-900">"Add"</span> di pojok kanan atas.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <button className="bg-teal-600 text-white px-10 py-4 rounded-xl text-xl font-bold hover:bg-teal-700 transition-all shadow-xl">
                            Cek Dukungan Perangkat
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
