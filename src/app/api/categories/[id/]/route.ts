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

    const category = await prisma.category.findUnique({
        where: {
            id: params.id,
            warungId: session.user.warungId,
        },
    });

    if (!category) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(category);
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    try {
        const category = await prisma.category.update({
            where: {
                id: params.id,
                warungId: session.user.warungId,
            },
            data: { name },
        });
        return NextResponse.json(category);
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
        await prisma.category.delete({
            where: {
                id: params.id,
                warungId: session.user.warungId,
            },
        });
        return NextResponse.json({ message: "Category deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
