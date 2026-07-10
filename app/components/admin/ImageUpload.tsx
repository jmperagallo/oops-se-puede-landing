// app/components/admin/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import { supabase, supabaseAdmin, supabaseUrl } from "../../../lib/supabase/client";
import { compressImage } from "../../../lib/utils/compressImage";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket: string;
  folder?: string;
  label?: string;
  maxSize?: number;
  quality?: number;
  onDelete?: (oldUrl: string) => Promise<void>;
}

export default function ImageUpload({
  value,
  onChange,
  bucket,
  folder = "",
  label = "Subir imagen",
  maxSize = 1200,
  quality = 0.9,
  onDelete,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imágenes");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen no puede superar los 10MB");
      return;
    }

    // Si hay una imagen antigua y onDelete, eliminarla primero
    if (value && onDelete) {
      try {
        console.log("🗑️ Eliminando imagen antigua:", value);
        await onDelete(value);
        console.log("✅ Imagen antigua eliminada");
      } catch (err) {
        console.error("❌ Error eliminando imagen antigua:", err);
        // Continuamos con la subida aunque falle la eliminación
      }
    }

    setUploading(true);
    setError(null);
    setProgress(10);

    try {
      setProgress(30);
      const compressedFile = await compressImage(file, maxSize, quality);
      setProgress(60);

      const fileExt = 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      setProgress(75);
      const { data, error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      setProgress(90);

      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
      console.log("🔗 URL generada:", publicUrl);
      
      onChange(publicUrl);
      console.log("✅ Imagen subida:", publicUrl);
      setProgress(100);
    } catch (err) {
      console.error("❌ Error COMPLETO:", err);
      let errorMessage = "Error al subir la imagen";
      if (err instanceof Error) {
        if (err.message.includes("row-level security")) {
          errorMessage = "Error de permisos en la base de datos. Por favor, contacta al administrador.";
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (value && onDelete) {
      try {
        await onDelete(value);
        console.log("✅ Imagen eliminada correctamente");
      } catch (err) {
        console.error("❌ Error eliminando imagen:", err);
      }
    }
    onChange("");
  };

  // ✅ Función para abrir el selector de archivos
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#555]">
        {label}
      </label>

      {value ? (
        <div className="relative inline-block group">
          {/* ✅ La imagen es clickeable para cambiar */}
          <div 
            onClick={handleClick}
            className="cursor-pointer relative w-32 h-32 rounded-lg overflow-hidden border border-[#D8C7B5]/30 shadow-sm hover:shadow-md transition"
          >
            <img
              src={value}
              alt="Vista previa"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/128x128?text=Error";
              }}
            />
            {/* Overlay "Cambiar imagen" */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
              <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition px-2 text-center">
                Cambiar imagen
              </span>
            </div>
          </div>
          
          {/* Botón eliminar (X) */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-md z-10"
            title="Eliminar imagen"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`w-32 h-32 rounded-lg border-2 border-dashed ${
            error ? 'border-red-400 bg-red-50' : 'border-[#D8C7B5] hover:border-[#556B5D]'
          } flex flex-col items-center justify-center cursor-pointer transition bg-[#fafbfc] hover:bg-[#f5f6f8]`}
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#556B5D] border-t-transparent mx-auto" />
              <span className="text-xs text-[#95a5a6] mt-1 block">
                {progress < 60 ? 'Comprimiendo...' : 'Subiendo...'}
              </span>
            </div>
          ) : (
            <>
              <Upload size={24} className="text-[#95a5a6]" />
              <span className="text-xs text-[#95a5a6] mt-1">Clic para subir</span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      <p className="text-xs text-[#95a5a6]">
        📸 Formatos: JPG, PNG, GIF (máx. 10MB) • Se comprime automáticamente
      </p>
    </div>
  );
}