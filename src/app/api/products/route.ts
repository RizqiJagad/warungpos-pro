import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
        where: {
            warungId: session.user.warungId,
        },
        include: {
            category: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, buyPrice, sellPrice, categoryId, sku, barcode, unit, minStock } = data;

    if (!name || !buyPrice || !sellPrice) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                sku,
                barcode,
                buyPrice,
                sellPrice,
                unit: unit || "pcs",
                minStock: minStock || 0,
                categoryId,
                warungId: session.user.warungId,
            },
        });
        return NextResponse.json(product);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "SKU or Barcode already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
