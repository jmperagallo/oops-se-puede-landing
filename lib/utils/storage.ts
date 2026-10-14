// lib/utils/storage.ts
import { supabaseAdmin } from "../supabase/client";

/**
 * Extrae la ruta del archivo desde la URL pública de Supabase
 * Ejemplo: https://xxx.supabase.co/storage/v1/object/public/productos/1792016476804-fiim78h5.jpg
 * → 1792016476804-fiim78h5.jpg
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
  
  // ✅ La parte después de /public/ es "productos/nombre.jpg" o "nombre.jpg"
  // Necesitamos quedarnos SOLO con lo que está después del bucket name
  let path = parts[1];
  
  // El bucket name es el primer segmento después de /public/
  // Ej: "productos/1792016476804-fiim78h5.jpg" → bucket = "productos"
  const bucketName = path.split('/')[0];
  
  // Devolvemos solo el resto (el nombre del archivo)
  const fileName = path.substring(bucketName.length + 1);
  
  console.log('🔍 Ruta extraída:', fileName);
  return decodeURIComponent(fileName);
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

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('❌ Error eliminando archivo:', error);
      return false;
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ Supabase no eliminó nada. La ruta no coincidió.');
      return false;
    }

    console.log('✅ Archivo eliminado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error en eliminarImagenDelBucket:', error);
    return false;
  }
}