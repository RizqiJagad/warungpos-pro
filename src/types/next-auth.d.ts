import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role: UserRole;
        warungId: string | null;
    }

    interface Session {
        user: {
            id: string;
            role: UserRole;
            warungId: string | null;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
        warungId: string | null;
    }
}
