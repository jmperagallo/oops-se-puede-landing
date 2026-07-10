// app/gestion_oops/productos/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase, supabaseAdmin } from "../../../lib/supabase/client";
import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";
import { Pencil, Trash2, Plus, Eye, EyeOff, Star } from "lucide-react";

interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion_corta: string;
  precio: number;
  categoria_id: string;
  categoria_nombre?: string;
  etiquetas: string[];
  imagenes: string[];
  stock: number;
  activo: boolean;
  destacado: boolean;
  created_at: string;
}

interface Categoria {
  id: string;
  nombre: string;
}

export default function AdminProductos() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Producto | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/gestion_oops/login");
    }
    if (status === "authenticated") {
      cargarProductos();
      cargarCategorias();
    }
  }, [status, router]);

  // ✅ USAR supabaseAdmin PARA LEER PRODUCTOS (bypass RLS)
  const cargarProductos = async () => {
    setLoading(true);
    
    const { data: productosData, error: productosError } = await supabaseAdmin
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });

    if (productosError) {
      console.error("❌ Error cargando productos:", productosError);
      setLoading(false);
      return;
    }

    console.log("📦 Productos sin categoría:", productosData);

    // ✅ USAR supabase (público) PARA LEER CATEGORÍAS (no necesita autenticación)
    const { data: categoriasData, error: categoriasError } = await supabase
      .from("categorias")
      .select("id, nombre");

    if (categoriasError) {
      console.error("❌ Error cargando categorías:", categoriasError);
      setLoading(false);
      return;
    }

    // Crear un mapa de categorías
    const categoriasMap: Record<string, string> = {};
    categoriasData?.forEach((cat) => {
      categoriasMap[cat.id] = cat.nombre;
    });

    // Agregar el nombre de la categoría a cada producto
    const productosConCategoria = productosData?.map((p) => ({
      ...p,
      categoria_nombre: p.categoria_id ? categoriasMap[p.categoria_id] : "Sin categoría",
    })) || [];

    setProductos(productosConCategoria);
    console.log("✅ Productos cargados:", productosConCategoria.length);
    setLoading(false);
  };

  const cargarCategorias = async () => {
    const { data, error } = await supabase
      .from("categorias")
      .select("id, nombre")
      .eq("activo", true)
      .order("orden", { ascending: true });

    if (!error && data) {
      setCategorias(data);
    } else {
      console.error("❌ Error cargando categorías:", error);
    }
  };

  // ✅ USAR supabaseAdmin PARA ELIMINAR
  const eliminarProducto = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar el producto "${nombre}"?`)) {
      return;
    }

    const { error } = await supabaseAdmin
      .from("productos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Error eliminando producto:", error);
      alert("Error al eliminar el producto");
    } else {
      cargarProductos();
    }
  };

  // ✅ USAR supabaseAdmin PARA ACTUALIZAR
  const toggleActivo = async (id: string, activo: boolean) => {
    const { error } = await supabaseAdmin
      .from("productos")
      .update({ activo: !activo, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      cargarProductos();
    } else {
      console.error("❌ Error actualizando estado:", error);
    }
  };

  // ✅ USAR supabaseAdmin PARA ACTUALIZAR
  const toggleDestacado = async (id: string, destacado: boolean) => {
    const { error } = await supabaseAdmin
      .from("productos")
      .update({ destacado: !destacado, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      cargarProductos();
    } else {
      console.error("❌ Error actualizando destacado:", error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const editarProducto = (producto: Producto) => {
    setEditing(producto);
    setShowForm(true);
  };

  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-pulse text-4xl mb-4">⏳</div>
            <p className="text-[#95a5a6]">Cargando productos...</p>
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
              🍰 Productos
            </h1>
            <p className="text-sm text-[#95a5a6] font-montserrat mt-1">
              Gestiona la carta digital de OOPS! SE PUEDE
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#556B5D] text-white px-4 py-2 rounded-xl hover:bg-[#3d4f43] transition shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            <span>Nuevo Producto</span>
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-[#D8C7B5]/30">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              {editing ? (
                <>
                  <Pencil size={18} className="text-[#B89B5E]" />
                  Editar Producto
                </>
              ) : (
                <>
                  <Plus size={18} className="text-[#556B5D]" />
                  Nuevo Producto
                </>
              )}
            </h2>
            <ProductForm
              editing={editing}
              categorias={categorias}
              onSuccess={() => {
                resetForm();
                cargarProductos();
              }}
              onCancel={resetForm}
            />
          </div>
        )}

        {/* Listado */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#95a5a6]">Cargando...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-[#1C1C1C]">No hay productos</h3>
            <p className="text-[#95a5a6]">Crea tu primer producto para empezar.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] border-b border-[#D8C7B5]/30">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">#</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Imagen</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Nombre</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Categoría</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Precio</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Destacado</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Estado</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto, index) => (
                    <tr
                      key={producto.id}
                      className="border-b border-[#f1f1f1] hover:bg-[#fafbfc] transition"
                    >
                      <td className="p-4 text-sm text-[#95a5a6]">{index + 1}</td>
                      <td className="p-4">
                        {producto.imagenes && producto.imagenes.length > 0 ? (
                          <img
                            src={producto.imagenes[0]}
                            alt={producto.nombre}
                            className="w-12 h-12 rounded-lg object-cover border border-[#D8C7B5]/30"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/48x48?text=🍰";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#D8C7B5]/20 flex items-center justify-center text-xl">
                            🍰
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-medium text-[#1C1C1C]">
                        {producto.nombre}
                      </td>
                      <td className="p-4 text-sm text-[#95a5a6]">
                        {producto.categoria_nombre || "Sin categoría"}
                      </td>
                      <td className="p-4 font-playfair text-[#B89B5E] font-bold">
                        ${producto.precio.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleDestacado(producto.id, producto.destacado)}
                          className={`p-1.5 rounded transition ${
                            producto.destacado
                              ? "text-yellow-500 hover:text-yellow-600"
                              : "text-[#95a5a6] hover:text-yellow-400"
                          }`}
                          title={producto.destacado ? "Quitar destacado" : "Marcar como destacado"}
                        >
                          <Star size={18} fill={producto.destacado ? "currentColor" : "none"} />
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleActivo(producto.id, producto.activo)}
                          className={`p-1.5 rounded transition ${
                            producto.activo
                              ? "text-green-500 hover:text-green-600"
                              : "text-red-500 hover:text-red-600"
                          }`}
                          title={producto.activo ? "Desactivar" : "Activar"}
                        >
                          {producto.activo ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => editarProducto(producto)}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 text-blue-500 hover:text-blue-700 transition"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => eliminarProducto(producto.id, producto.nombre)}
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
              Total: {productos.length} productos
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}