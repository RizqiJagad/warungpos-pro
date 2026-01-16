"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    BarChart3,
    Settings,
    Truck,
    History,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/app" },
    { icon: ShoppingCart, label: "Kasir (POS)", href: "/app/pos" },
    { icon: Package, label: "Produk", href: "/app/products" },
    { icon: Truck, label: "Supplier", href: "/app/suppliers" },
    { icon: Users, label: "Pelanggan", href: "/app/customers" },
    { icon: BarChart3, label: "Laporan", href: "/app/reports" },
    { icon: Settings, label: "Pengaturan", href: "/app/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800">
            <div className="p-6">
                <Link href="/app" className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold">W</div>
                    <span className="font-bold text-xl">WarungPOS</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                                isActive
                                    ? "bg-teal-500/10 text-teal-400 font-medium"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-teal-400" : "text-slate-400 group-hover:text-white")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-slate-800 hover:text-white transition-all text-slate-400">
                    <LogOut className="w-5 h-5" />
                    Keluar
                </button>
            </div>
        </aside>
    );
}
