// lib/utils/compressImage.ts

/**
 * Comprime una imagen a un tamaño máximo y calidad específica
 * @param file - Archivo de imagen a comprimir
 * @param maxSize - Tamaño máximo en píxeles (lado más largo)
 * @param quality - Calidad JPEG (0.85 = 85%)
 * @returns Promise<File> - Archivo comprimido
 */
export async function compressImage(
  file: File,
  maxSize: number = 1200,
  quality: number = 0.9
): Promise<File> {
  return new Promise((resolve, reject) => {
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      reject(new Error('El archivo no es una imagen'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Calcular nuevo tamaño manteniendo proporción
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('No se pudo crear el contexto del canvas'));
          return;
        }
        
        // Dibujar imagen redimensionada
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Exportar como JPEG con calidad ajustable
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al comprimir la imagen'));
              return;
            }
            
            // Crear nombre de archivo con extensión .jpg
            const originalName = file.name.split('.')[0] || 'imagen';
            const compressedFile = new File(
              [blob],
              `${originalName}-comprimida.jpg`,
              {
                type: 'image/jpeg',
                lastModified: Date.now(),
              }
            );
            
            console.log(`✅ Imagen comprimida: ${file.size} → ${blob.size} bytes`);
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
  });
}