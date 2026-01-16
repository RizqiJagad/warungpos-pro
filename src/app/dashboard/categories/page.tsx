"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Category {
    id: string;
    name: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();

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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
            const method = editingId ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                body: JSON.stringify({ name }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Gagal menyimpan kategori");
            }

            toast({
                title: "Berhasil",
                description: `Kategori berhasil ${editingId ? "diperbarui" : "ditambahkan"}`,
            });

            setOpen(false);
            setName("");
            setEditingId(null);
            fetchCategories();
        } catch (error: any) {
            toast({
                title: "Gagal",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setName(category.name);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;

        try {
            const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus kategori");

            toast({
                title: "Berhasil",
                description: "Kategori berhasil dihapus",
            });
            fetchCategories();
        } catch (error: any) {
            toast({
                title: "Gagal",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Kategori Produk</h1>
                <Dialog open={open} onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) {
                        setEditingId(null);
                        setName("");
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Kategori
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit" : "Tambah"} Kategori</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Kategori</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Contoh: Sembako, Minuman, Snak"
                                    required
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={submitting}>
                                    {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Simpan
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Kategori</TableHead>
                            <TableHead className="w-[100px] text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-8 text-slate-500">
                                    Belum ada kategori.
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                                                <Pencil className="w-4 h-4 text-slate-600" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
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
