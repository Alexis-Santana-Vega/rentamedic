/**
 * @file shared/types/image-picker.types.ts
 */

/** Imagen nueva capturada o seleccionada por el usuario */
export interface NewImage {
  file: File;
  preview: string; // DataURL para mostrar localmente antes de subir
}

/** Estado expuesto al padre a través de defineExpose */
export interface ImagePickerExpose {
  /** Archivos nuevos listos para subir */
  newFiles: File[];
  /** URLs de imágenes existentes que el usuario eliminó */
  deletedUrls: string[];
  /** Resetea el componente a su estado inicial */
  reset: () => void;
}

/** Opción de cámara disponible en el dispositivo */
export interface CameraOption {
  label: string;
  value: string;
}
