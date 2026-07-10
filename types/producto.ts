// types/producto.ts
export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion_corta: string;
  descripcion_larga: string;
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

export interface Categoria {
  id: string;
  nombre: string;
}