// app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/lib/auth/auth";
import NextAuth from "next-auth";

console.log("🔧 Inicializando NextAuth con authOptions...");

const handler = NextAuth(authOptions);

console.log("✅ NextAuth inicializado con Supabase");

export { handler as GET, handler as POST };