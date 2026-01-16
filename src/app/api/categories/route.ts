import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
        where: {
            warungId: session.user.warungId,
        },
        orderBy: {
            name: "asc",
        },
    });

    return NextResponse.json(categories);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.warungId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    try {
        const category = await prisma.category.create({
            data: {
                name,
                warungId: session.user.warungId,
            },
        });
        return NextResponse.json(category);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
