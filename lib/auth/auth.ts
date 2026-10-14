// lib/auth/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ No se recibieron credenciales");
          return null;
        }

        console.log("🔍 Buscando usuario:", credentials.email);

        const { data: usuario, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !usuario) {
          console.log("❌ Usuario no encontrado:", error?.message);
          return null;
        }

        if (!usuario.activo) {
          console.log("❌ Usuario inactivo");
          return null;
        }

        console.log("✅ Usuario encontrado:", usuario.email);

        const passwordValida = await bcrypt.compare(
          credentials.password,
          usuario.password
        );

        if (!passwordValida) {
          console.log("❌ Contraseña incorrecta");
          return null;
        }

        console.log("✅ Login exitoso para:", usuario.email);
        console.log("📋 Rol:", usuario.rol);
        console.log("📋 Permisos:", usuario.permisos);

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nombre,
          rol: usuario.rol,
          activo: usuario.activo,
          permisos: usuario.permisos || [],
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
        token.activo = user.activo;
        token.permisos = user.permisos;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as string;
        session.user.activo = token.activo as boolean;
        session.user.permisos = token.permisos as string[];
      }
      return session;
    }
  },
  pages: {
    signIn: '/gestion_oops/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};