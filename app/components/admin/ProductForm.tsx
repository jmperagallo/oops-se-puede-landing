// app/components/admin/ProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { supabaseAdmin } from "../../../lib/supabase/client";
import ImageUpload from "./ImageUpload";
import { Producto, Categoria } from "@/types/producto";

interface ProductFormProps {
  editing: Producto | null;
  categorias: Categoria[];
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  editing,
  categorias,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [nombre, setNombre] = useState("");
  const [descripcionCorta, setDescripcionCorta] = useState("");
  const [descripcionLarga, setDescripcionLarga] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [etiquetas, setEtiquetas] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [stock, setStock] = useState("");
  const [activo, setActivo] = useState(true);
  const [destacado, setDestacado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setNombre(editing.nombre || "");
      setDescripcionCorta(editing.descripcion_corta || "");
      setDescripcionLarga(editing.descripcion_larga || "");
      setPrecio(editing.precio ? String(editing.precio) : "");
      setCategoriaId(editing.categoria_id || "");
      setEtiquetas(editing.etiquetas?.join(", ") || "");
      setImagenes(editing.imagenes || []);
      setStock(editing.stock ? String(editing.stock) : "");
      setActivo(editing.activo !== undefined ? editing.activo : true);
      setDestacado(editing.destacado || false);
    }
  }, [editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !precio || !categoriaId) {
      alert("Nombre, precio y categoría son obligatorios");
      return;
    }

    setLoading(true);

    const slug = nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const etiquetasArray = etiquetas
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);

    const productoData = {
      nombre: nombre.trim(),
      slug,
      descripcion_corta: descripcionCorta.trim() || null,
      descripcion_larga: descripcionLarga.trim() || null,
      precio: parseInt(precio),
      categoria_id: categoriaId,
      etiquetas: etiquetasArray,
      imagenes: imagenes,
      stock: parseInt(stock) || 0,
      activo,
      destacado,
    };

    let error;
    if (editing) {
      const { error: updateError } = await supabaseAdmin
        .from("productos")
        .update({ ...productoData, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("productos")
        .insert([productoData]);
      error = insertError;
    }

    setLoading(false);

    if (error) {
      console.error("❌ Error guardando producto:", error);
      alert(`Error: ${error.message}`);
    } else {
      alert(editing ? "✅ Producto actualizado" : "✅ Producto creado");
      onSuccess();
    }
  };

  const handleImageChange = (url: string) => {
    setImagenes((prev) => [...prev, url]);
  };

  const handleImageRemove = (index: number) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#555] mb-1">
            Nombre *
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
            placeholder="Ej: Croissant Keto"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#555] mb-1">
            Categoría *
          </label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#555] mb-1">
            Precio (CLP) *
          </label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
            placeholder="Ej: 3990"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#555] mb-1">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
            placeholder="Ej: 10"
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#555] mb-1">
          Descripción Corta
        </label>
        <input
          type="text"
          value={descripcionCorta}
          onChange={(e) => setDescripcionCorta(e.target.value)}
          className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
          placeholder="Breve descripción del producto"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#555] mb-1">
          Descripción Larga (opcional)
        </label>
        <textarea
          value={descripcionLarga}
          onChange={(e) => setDescripcionLarga(e.target.value)}
          className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
          rows={3}
          placeholder="Descripción detallada del producto..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#555] mb-1">
          Etiquetas (separadas por comas)
        </label>
        <input
          type="text"
          value={etiquetas}
          onChange={(e) => setEtiquetas(e.target.value)}
          className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
          placeholder="Ej: Keto, Sin Gluten, Sin Lactosa"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#555] mb-1">
          Imágenes
        </label>
        <div className="space-y-2">
          {imagenes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {imagenes.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover border border-[#D8C7B5]/30"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <ImageUpload
            value=""
            onChange={handleImageChange}
            bucket="productos"
            folder="productos"
            label="Agregar imagen"
            maxSize={1200}
            quality={0.9}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#555] mb-1">
            Estado
          </label>
          <select
            value={activo ? "true" : "false"}
            onChange={(e) => setActivo(e.target.value === "true")}
            className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
          >
            <option value="true">✅ Activo</option>
            <option value="false">❌ Inactivo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#555] mb-1">
            Destacado
          </label>
          <select
            value={destacado ? "true" : "false"}
            onChange={(e) => setDestacado(e.target.value === "true")}
            className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
          >
            <option value="true">⭐ Destacado</option>
            <option value="false">📄 Normal</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#556B5D] text-white px-6 py-2 rounded-lg hover:bg-[#3d4f43] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : editing ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#95a5a6] text-white px-6 py-2 rounded-lg hover:bg-[#7f8c8d] transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}