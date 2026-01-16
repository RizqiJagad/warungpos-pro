"use client";

import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari produk atau transaksi..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-1"></div>

                <button className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-100 rounded-full transition-all text-slate-700">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold uppercase text-xs">
                        JD
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-bold leading-tight">Joko Doe</p>
                        <p className="text-[10px] text-slate-500">Pemilik Warung</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
