// app/api/test-supabase/route.ts
import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Probar conexión: obtener las tablas públicas
    const { data: tablas, error: errorTablas } = await supabase
      .from('usuarios') // <--- CAMBIAR por 'usuarios' o 'Usuarios' según corresponda
      .select('*');

    if (errorTablas) {
      console.log("❌ Error al consultar 'usuarios':", errorTablas.message);
      return NextResponse.json({ 
        success: false, 
        error: errorTablas.message,
        mensaje: "No se pudo consultar la tabla 'usuarios'. Verifica que el nombre sea correcto."
      }, { status: 500 });
    }

    console.log("✅ Consulta exitosa. Usuarios encontrados:", tablas?.length || 0);

    return NextResponse.json({ 
      success: true, 
      message: '✅ Conexión exitosa a Supabase',
      totalUsuarios: tablas?.length || 0,
      usuarios: tablas || []
    });
  } catch (error) {
    console.log("❌ Excepción:", error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}