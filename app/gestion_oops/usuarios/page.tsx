// app/gestion_oops/usuarios/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabase/client";
import AdminLayout from "../../components/admin/AdminLayout";
import bcrypt from "bcryptjs";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const MODULOS_DISPONIBLES = [
  { slug: "categorias", label: "Categorías", icon: "📂" },
  { slug: "productos", label: "Productos", icon: "🍰" },
  { slug: "estadisticas", label: "Estadísticas", icon: "📈" },
  { slug: "prospectos", label: "Prospectos", icon: "📧" },
  { slug: "galeria", label: "Galería", icon: "📷" },
  { slug: "pedidos", label: "Pedidos", icon: "📦" },
  { slug: "configuracion", label: "Configuración", icon: "⚙️" },
];

interface Usuario {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  activo: boolean;
  permisos: string[];
  created_at: string;
}

export default function AdminUsuarios() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("COLABORADOR");
  const [activo, setActivo] = useState(true);
  const [permisos, setPermisos] = useState<string[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/gestion_oops/login");
    }
    if (status === "authenticated") {
      if (session?.user?.rol !== "ADMIN") {
        router.push("/gestion_oops");
        return;
      }
      cargarUsuarios();
    }
  }, [status, router, session]);

  const cargarUsuarios = async () => {
    setLoading(true);
    const { data, error } = await supabaseAdmin
      .from("usuarios")
      .select("id, email, nombre, rol, activo, permisos, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsuarios(data);
    }
    setLoading(false);
  };

  const togglePermiso = (slug: string) => {
    setPermisos((prev) =>
      prev.includes(slug) ? prev.filter((p) => p !== slug) : [...prev, slug]
    );
  };

  const guardarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      alert("Nombre y email son obligatorios");
      return;
    }

    const usuarioData: any = {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      rol,
      activo,
      permisos: rol === "ADMIN" ? [] : permisos,
    };

    if (password.trim()) {
      usuarioData.password = await bcrypt.hash(password, 10);
    } else if (!editing) {
      alert("La contraseña es obligatoria para nuevos usuarios");
      return;
    }

    let error;
    if (editing) {
      const { error: updateError } = await supabaseAdmin
        .from("usuarios")
        .update(usuarioData)
        .eq("id", editing.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("usuarios")
        .insert([usuarioData]);
      error = insertError;
    }

    if (error) {
      console.error("❌ Error guardando usuario:", error);
      alert(`Error: ${error.message}`);
    } else {
      alert(editing ? "✅ Usuario actualizado" : "✅ Usuario creado");
      resetForm();
      cargarUsuarios();
    }
  };

  const eliminarUsuario = async (id: string, nombre: string) => {
    if (id === session?.user?.id) {
      alert("No puedes eliminar tu propio usuario");
      return;
    }

    if (!confirm(`¿Eliminar al usuario "${nombre}"?`)) return;

    const { error } = await supabaseAdmin
      .from("usuarios")
      .delete()
      .eq("id", id);

    if (!error) {
      cargarUsuarios();
    } else {
      alert("Error al eliminar el usuario");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setNombre("");
    setEmail("");
    setPassword("");
    setRol("COLABORADOR");
    setActivo(true);
    setPermisos([]);
  };

  const editarUsuario = (usuario: Usuario) => {
    setEditing(usuario);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setPassword("");
    setRol(usuario.rol);
    setActivo(usuario.activo);
    setPermisos(usuario.permisos || []);
    setShowForm(true);
  };

  if (status === "loading") {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#95a5a6]">Cargando...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1C1C1C] font-playfair">
              🛡️ Usuarios
            </h1>
            <p className="text-sm text-[#95a5a6] font-montserrat mt-1">
              Gestiona los accesos al panel de administración
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#556B5D] text-white px-4 py-2 rounded-xl hover:bg-[#3d4f43] transition shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-[#D8C7B5]/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                {editing ? "✏️ Editar Usuario" : "➕ Nuevo Usuario"}
              </h2>
              <button onClick={resetForm} className="text-[#95a5a6] hover:text-[#1C1C1C]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={guardarUsuario} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-1">Nombre *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-1">
                    Contraseña {editing && "(dejar en blanco para no cambiar)"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D]"
                    placeholder={editing ? "••••••••" : "Contraseña"}
                    required={!editing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-1">Rol</label>
                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    className="w-full px-4 py-2 border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B5D]"
                  >
                    <option value="COLABORADOR">Colaborador</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>

              {rol === "COLABORADOR" && (
                <div className="bg-[#f8f9fa] rounded-lg p-4 border border-[#D8C7B5]/30">
                  <label className="block text-sm font-medium text-[#555] mb-3">
                    📋 Módulos autorizados
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {MODULOS_DISPONIBLES.map((mod) => (
                      <label
                        key={mod.slug}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={permisos.includes(mod.slug)}
                          onChange={() => togglePermiso(mod.slug)}
                          className="w-4 h-4 accent-[#556B5D]"
                        />
                        <span className="text-sm">
                          {mod.icon} {mod.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  className="w-4 h-4 accent-[#556B5D]"
                />
                <label htmlFor="activo" className="text-sm text-[#555]">
                  Usuario activo
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#556B5D] text-white px-6 py-2 rounded-lg hover:bg-[#3d4f43] transition"
                >
                  {editing ? "Actualizar" : "Crear Usuario"}
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#95a5a6]">Cargando...</p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-[#1C1C1C]">No hay usuarios</h3>
            <p className="text-[#95a5a6]">Crea tu primer usuario para empezar.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] border-b border-[#D8C7B5]/30">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Nombre</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Email</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Rol</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Módulos</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Estado</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#7f8c8d]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfc]">
                      <td className="p-4 font-medium text-[#1C1C1C]">{usuario.nombre}</td>
                      <td className="p-4 text-sm text-[#95a5a6]">{usuario.email}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          usuario.rol === "ADMIN" 
                            ? "bg-purple-100 text-purple-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[#95a5a6]">
                        {usuario.rol === "ADMIN" 
                          ? "Todos" 
                          : (usuario.permisos?.length || 0) + " módulos"}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          usuario.activo 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {usuario.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => editarUsuario(usuario)}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 text-blue-500"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => eliminarUsuario(usuario.id, usuario.nombre)}
                            className="p-1.5 rounded hover:bg-[#D8C7B5]/20 text-red-500"
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}