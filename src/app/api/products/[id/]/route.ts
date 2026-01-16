import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
        where: {
            id: params.id,
            warungId: session.user.warungId,
        },
        include: {
            category: true,
        },
    });

    if (!product) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(product);
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    try {
        const product = await prisma.product.update({
            where: {
                id: params.id,
                warungId: session.user.warungId,
            },
            data,
        });
        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.product.delete({
            where: {
                id: params.id,
                warungId: session.user.warungId,
            },
        });
        return NextResponse.json({ message: "Product deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
