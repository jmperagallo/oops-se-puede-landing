// lib/utils/storage.ts
import { supabaseAdmin } from "../supabase/client";

/**
 * Extrae la ruta del archivo desde la URL pública de Supabase
 * y decodifica caracteres especiales (como %20)
 */
export function getFilePathFromUrl(url: string): string | null {
  if (!url) return null;
  
  // Remover query parameters si existen
  const urlWithoutParams = url.split('?')[0];
  
  // Buscar la parte después de /public/
  const parts = urlWithoutParams.split('/public/');
  if (parts.length < 2) {
    console.warn('⚠️ Formato de URL no reconocido:', url);
    return null;
  }
  
  // ✅ DECODIFICAR la ruta para que coincida con el nombre real del archivo
  const decodedPath = decodeURIComponent(parts[1]);
  
  console.log('🔍 Ruta original:', parts[1]);
  console.log('🔍 Ruta decodificada:', decodedPath);
  
  return decodedPath;
}

export async function eliminarImagenDelBucket(
  url: string,
  bucket: string
): Promise<boolean> {
  try {
    const filePath = getFilePathFromUrl(url);
    if (!filePath) {
      console.warn('⚠️ No se pudo extraer la ruta de la URL:', url);
      return false;
    }

    console.log(`🗑️ Eliminando archivo del bucket "${bucket}":`, filePath);

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('❌ Error eliminando archivo:', error);
      return false;
    }

    console.log('✅ Archivo eliminado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error en eliminarImagenDelBucket:', error);
    return false;
  }
}

export async function eliminarImagenesDelBucket(
  urls: string[],
  bucket: string
): Promise<number> {
  let eliminadas = 0;
  for (const url of urls) {
    if (url && url.trim()) {
      const ok = await eliminarImagenDelBucket(url, bucket);
      if (ok) eliminadas++;
    }
  }
  return eliminadas;
}