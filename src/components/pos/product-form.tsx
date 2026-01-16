"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Category {
    id: string;
    name: string;
}

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing }: ProductFormProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingCategories, setFetchingCategories] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        sku: initialData?.sku || "",
        barcode: initialData?.barcode || "",
        buyPrice: initialData?.buyPrice || "",
        sellPrice: initialData?.sellPrice || "",
        unit: initialData?.unit || "pcs",
        minStock: initialData?.minStock || "0",
        categoryId: initialData?.categoryId || "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Gagal memuat kategori",
                    variant: "destructive",
                });
            } finally {
                setFetchingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing ? `/api/products/${initialData.id}` : "/api/products";
            const method = isEditing ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    buyPrice: Number(formData.buyPrice),
                    sellPrice: Number(formData.sellPrice),
                    minStock: Number(formData.minStock),
                    categoryId: formData.categoryId === "none" ? null : formData.categoryId,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Gagal menyimpan produk");
            }

            toast({
                title: "Berhasil",
                description: `Produk berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`,
            });
            router.push("/dashboard/products");
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Gagal",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetchingCategories) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-teal-600" /></div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-2xl border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">Nama Produk*</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Minyak Goreng Blue Band 1L"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Kode Internal)</Label>
                    <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="SKU001"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                        id="barcode"
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        placeholder="899123456789"
                    />
                </div>

                <div className="space-y-2 text-emerald-600">
                    <Label htmlFor="buyPrice">Harga Beli*</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rp</span>
                        <Input
                            id="buyPrice"
                            type="number"
                            className="pl-9"
                            value={formData.buyPrice}
                            onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2 text-teal-600">
                    <Label htmlFor="sellPrice">Harga Jual*</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rp</span>
                        <Input
                            id="sellPrice"
                            type="number"
                            className="pl-9"
                            value={formData.sellPrice}
                            onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                        onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
                        defaultValue={formData.categoryId || "none"}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Tanpa Kategori</SelectItem>
                            {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="unit">Satuan</Label>
                    <Input
                        id="unit"
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="pcs, kg, liter, dus"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="minStock">Peringatan Stok Minimum</Label>
                    <Input
                        id="minStock"
                        type="number"
                        value={formData.minStock}
                        onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    />
                </div>
            </div>

            <div className="pt-4 flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    disabled={loading}
                >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEditing ? "Perbarui Produk" : "Tambah Produk"}
                </Button>
            </div>
        </form>
    );
}
