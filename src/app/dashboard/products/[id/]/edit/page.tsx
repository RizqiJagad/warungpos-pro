import { ProductForm } from "@/components/pos/product-form";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    const product = await prisma.product.findUnique({
        where: {
            id: params.id,
            warungId: session?.user?.warungId as string,
        },
    });

    if (!product) {
        notFound();
    }

    // Convert Decimal to Number for serialization
    const serializeProduct = {
        ...product,
        buyPrice: Number(product.buyPrice),
        sellPrice: Number(product.sellPrice),
        wholesalePrice: product.wholesalePrice ? Number(product.wholesalePrice) : null,
        stock: Number(product.stock),
        minStock: Number(product.minStock),
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Edit Produk</h1>
                <p className="text-slate-500">Perbarui detail produk "{product.name}".</p>
            </div>
            <ProductForm initialData={serializeProduct} isEditing />
        </div>
    );
}
