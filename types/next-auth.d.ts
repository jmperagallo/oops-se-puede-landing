// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    rol: string;
    activo: boolean;
  }

  interface Session {
    user: {
      id: string;
      rol: string;
      activo: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: string;
    activo: boolean;
  }
}