// lib/utils/storage.ts
import { supabaseAdmin } from "../supabase/client";

/**
 * Extrae la ruta del archivo desde la URL pública de Supabase
 * Ejemplo: https://xxx.supabase.co/storage/v1/object/public/productos/productos/123.jpg
 * → productos/productos/123.jpg
 */
export function getFilePathFromUrl(url: string): string | null {
  if (!url) return null;
  const parts = url.split('/public/');
  if (parts.length < 2) return null;
  return parts[1];
}

/**
 * Elimina una imagen del bucket de Supabase Storage
 */
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

/**
 * Elimina múltiples imágenes de un bucket
 */
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