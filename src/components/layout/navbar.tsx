import Link from "next/link";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/icons/icon-192x192.png" alt="WarungPOS Logo" width={32} height={32} />
                    <span className="font-bold text-xl tracking-tight">WarungPOS <span className="text-teal-600">Pro</span></span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/features" className="hover:text-teal-600 transition-colors">Fitur</Link>
                    <Link href="/pricing" className="hover:text-teal-600 transition-colors">Harga</Link>
                    <Link href="/demo" className="hover:text-teal-600 transition-colors">Demo</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:text-teal-600 transition-colors">Masuk</Link>
                    <Link href="/download" className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-all shadow-md hover:shadow-lg">Download</Link>
                </div>
            </div>
        </nav>
    );
}
