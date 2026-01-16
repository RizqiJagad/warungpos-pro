import { ProductForm } from "@/components/pos/product-form";

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Tambah Produk Baru</h1>
                <p className="text-slate-500">Lengkapi detail produk di bawah ini.</p>
            </div>
            <ProductForm />
        </div>
    );
}
