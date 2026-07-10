// app/gestion_oops/categorias/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase, supabaseAdmin } from "../../../lib/supabase/client";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/admin/ImageUpload";
import { Pencil, Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";

interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  icono: string;
  imagen_url: string;
  orden: number;
  activo: boolean;
  created_at: string;
}

export default function AdminCategorias() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [icono, setIcono] = useState("📂");
  const [imagenUrl, setImagenUrl] = useState("");
  const [orden, setOrden] = useState(0);
  const [activo, setActivo] = useState(true);

  // ✅ Función para eliminar una imagen del bucket
  const eliminarImagenDelBucket = async (url: string) => {
    try {
      // Extraer la ruta del archivo de la URL
      const parts = url.split('/public/');
      if (parts.length < 2) {
        console.warn('⚠️ No se pudo extraer la ruta de la URL:', url);
        return;
      }
      
      const filePath = parts[1];
      console.log('🗑️ Eliminando archivo:', filePath);
      
      const { error } = await supabaseAdmin.storage
        .from('categorias')
        .remove([filePath]);
      
      if (error) {
        console.error('❌ Error eliminando archivo:', error);
        throw error;
      }
      
      console.log('✅ Archivo eliminado correctamente');
    } catch (error) {
      console.error('❌ Error en eliminarImagenDelBucket:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/gestion_oops/login");
    }
    if (status === "authenticated") {
      cargarCategorias();
    }
  }, [status, router]);

  const cargarCategorias = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("orden", { ascending: true });

    if (!error && data) {
      setCategorias(data);
      console.log("✅ Categorías cargadas:", data.length);
    } else {
      console.error("❌ Error cargando categorías:", error);
    }
    setLoading(false);
  };

  const guardarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    const slug = nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const categoriaData = {
      nombre: nombre.trim(),
      slug,
      descripcion: descripcion.trim() || null,
      icono: icono || null,
      imagen_url: imagenUrl.trim() || null,
      orden: Number(orden),
      activo,
    };

    let error;
    if (editing) {
      const { error: updateError } = await supabaseAdmin
        .from("categorias")
        .update({ ...categoriaData, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("categorias")
        .insert([categoriaData]);
      error = insertError;
    }

    if (error) {
      console.error("❌ Error guardando categoría:", error);
      alert(`Error: ${error.message}`);
    } else {
      console.log("✅ Categoría guardada exitosamente");
      resetForm();
      cargarCategorias();
    }
  };

  const eliminarCategoria = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar la categoría "${nombre}" y todos sus productos?`)) {
      return;
    }

    const { error } = await supabaseAdmin
      .from("categorias")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Error eliminando categoría:", error);
      alert("Error al eliminar la categoría");
    } else {
      cargarCategorias();
    }
  };

  const cambiarOrden = async (id: string, direccion: "up" | "down") => {
    const index = categorias.findIndex((c) => c.id === id);
    if (index === -1) return;

    const nuevoIndex = direccion === "up" ? index - 1 : index + 1;
    if (nuevoIndex < 0 || nuevoIndex >= categorias.length) return;

    const nuevasCategorias = [...categorias];
    const [item] = nuevasCategorias.splice(index, 1);
    nuevasCategorias.splice(nuevoIndex, 0, item);

    for (let i = 0; i < nuevasCategorias.length; i++) {
      await supabaseAdmin
        .from("categorias")
        .update({ orden: i + 1 })
        .eq("id", nuevasCategorias[i].id);
    }

    cargarCategorias();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setNombre("");
    setDescripcion("");
    setIcono("📂");
    setImagenUrl("");
    setOrden(0);
    setActivo(true);
  };

  const editarCategoria = (categoria: Categoria) => {
    setEditing(categoria);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion || "");
    setIcono(categoria.icono || "📂");
    setImagenUrl(categoria.imagen_url || "");
    setOrden(categoria.orden);
    setActivo(categoria.activo);
    setShowForm(true);
  };

  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-pulse text-4xl mb-4">⏳</div>
            <p className="text-[#95a5a6]">Cargando categorías...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1C1C1C] font-playfair">
              📂 Categorías
            </h1>
            <p className="text-sm text-[#95a5a6] font-montserrat mt-1">
              Organiza los productos de tu carta
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#556B5D] text-white px-4 py-2 rounded-xl hover:bg-[#3d4f43] transition shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            <span>Nueva Categoría</span>
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-[#D8C7B5]/30">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              {editing ? (
                <>
                  <Pencil size={18} className="text-[#B89B5E]" />
                  Editar Categoría
                </>
              ) : (
                <>
                  <Plus size={18} className="text-[#556B5D]" />
                  Nueva Categoría
                </>
              )}
            </h2>

            <form onSubmit={guardarCategoria} className="space-y-4">
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
                    placeholder="Ej: Snacks APLV-Keto"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-1">
                    Icono (emoji)
                  </label>
                  <input
                    type="text"
                    value={icono}
                    onChange={(e) => setIcono(e.target.value)}
                    className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
                    placeholder="Ej: 🍫"
                    maxLength={2}
                  />
                </div>
              </div>

              {/* ✅ ImageUpload con onDelete para eliminar imágenes antiguas */}
              <ImageUpload
                value={imagenUrl}
                onChange={setImagenUrl}
                bucket="categorias"
                folder="categorias"
                label="Imagen de la categoría"
                maxSize={1200}
                quality={0.9}
                onDelete={eliminarImagenDelBucket}
              />

              <div>
                <label className="block text-sm font-medium text-[#555] mb-1">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
                  rows={2}
                  placeholder="Breve descripción de la categoría..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-1">
                    Orden
                  </label>
                  <input
                    type="number"
                    value={orden}
                    onChange={(e) => setOrden(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D] focus:border-transparent transition"
                    min="0"
                  />
                </div>
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
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#556B5D] text-white px-6 py-2 rounded-lg hover:bg-[#3d4f43] transition"
                >
                  {editing ? "Actualizar" : "Crear"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-[#95a5a6] text-white px-6 py-2 rounded-lg hover:bg-[#7f8c8d] transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listado */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#95a5a6]">Cargando...</p>
          </div>
        ) : categorias.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-[#1C1C1C]">No hay categorías</h3>
            <p className="text-[#95a5a6]">Crea tu primera categoría para empezar.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] border-b border-[#D8C7B5]/30">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">#</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Imagen</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Icono</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Nombre</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Slug</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Orden</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Estado</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria, index) => (
                    <tr
                      key={categoria.id}
                      className="border-b border-[#f1f1f1] hover:bg-[#fafbfc] transition"
                    >
                      <td className="p-4 text-sm text-[#95a5a6]">{index + 1}</td>
                      <td className="p-4">
                        {categoria.imagen_url ? (
                          <img
                            src={categoria.imagen_url}
                            alt={categoria.nombre}
                            className="w-12 h-12 rounded-lg object-cover border border-[#D8C7B5]/30"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/48x48?text=📸";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#D8C7B5]/20 flex items-center justify-center text-xl">
                            📸
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-2xl">{categoria.icono || "📂"}</td>
                      <td className="p-4 font-medium text-[#1C1C1C]">
                        {categoria.nombre}
                      </td>
                      <td className="p-4 text-sm text-[#95a5a6] font-mono">
                        {categoria.slug}
                      </td>
                      <td className="p-4 text-sm text-[#95a5a6]">
                        {categoria.orden}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            categoria.activo
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {categoria.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => cambiarOrden(categoria.id, "up")}
                            disabled={index === 0}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            title="Subir orden"
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => cambiarOrden(categoria.id, "down")}
                            disabled={index === categorias.length - 1}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            title="Bajar orden"
                          >
                            <ChevronDown size={16} />
                          </button>
                          <button
                            onClick={() => editarCategoria(categoria)}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 text-blue-500 hover:text-blue-700 transition"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => eliminarCategoria(categoria.id, categoria.nombre)}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 text-red-500 hover:text-red-700 transition"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-[#f8f9fa] border-t border-[#D8C7B5]/30 text-sm text-[#95a5a6]">
              Total: {categorias.length} categorías
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}