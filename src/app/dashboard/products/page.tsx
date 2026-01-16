"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    sku: string | null;
    barcode: string | null;
    sellPrice: number;
    stock: number;
    unit: string;
    category: { name: string } | null;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { toast } = useToast();

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Gagal memuat produk",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(); // Actually fetchProducts
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus produk");

            toast({
                title: "Berhasil",
                description: "Produk berhasil dihapus",
            });
            fetchProducts();
        } catch (error: any) {
            toast({
                title: "Gagal",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku?.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Semua Produk</h1>
                <Link href="/dashboard/products/new">
                    <Button className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Produk
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Cari berdasarkan nama, SKU, atau barcode..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Produk</TableHead>
                            <TableHead>SKU/Barcode</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead className="text-right">Harga Jual</TableHead>
                            <TableHead className="text-center">Stok</TableHead>
                            <TableHead className="w-[100px] text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                                    {search ? "Produk tidak ditemukan." : "Belum ada produk."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-xs text-slate-400">{product.unit}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-slate-600">{product.sku || "-"}</div>
                                        <div className="text-xs text-slate-400">{product.barcode || "-"}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                            {product.category?.name || "Tanpa Kategori"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right font-bold">
                                        Rp {Number(product.sellPrice).toLocaleString('id-ID')}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={`font-bold ${product.stock <= 0 ? "text-red-600" : "text-slate-900"}`}>
                                            {Number(product.stock)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/dashboard/products/${product.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="w-4 h-4 text-slate-600" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
