<!--
  @file shared/components/ImagePicker.vue

  Permite seleccionar o capturar múltiples imágenes.
  La lógica de envío al backend es responsabilidad del padre.

  Props:
    existingSrcs  — URLs de imágenes ya guardadas en el servidor
    readonly      — desactiva la edición
    height/width  — dimensiones de cada miniatura

  Expose (accesible con ref desde el padre):
    newFiles      — File[] listos para subir
    deletedUrls   — URLs de imágenes existentes que el usuario eliminó
    reset()       — limpia el estado interno

  Uso en el padre al guardar:
    const picker = ref()
    const { newFiles, deletedUrls } = picker.value
    // await productService.uploadImages(newFiles)
    // await productService.deleteImages(deletedUrls)
-->
<template>
  <v-sheet class="mx-auto bg-background border border-dashed" elevation="0" max-width="100%">
    <v-slide-group class="pa-1" show-arrows>
      <!-- Imágenes nuevas (aún no subidas) -->
      <v-slide-group-item v-for="(img, i) in newImages" :key="`new-${i}`">
        <div class="ma-1">
          <ImagePreview
            :height="height"
            :width="width"
            :src="img.preview"
            @open-preview="handleOpenPreview(i)"
          >
            <template #actions>
              <v-btn
                icon="mdi-close"
                size="x-small"
                variant="flat"
                color="surface"
                class="position-fixed top-0 mt-3 ml-2"
                @click.stop="removeNewImage(i)"
              />
            </template>
          </ImagePreview>
        </div>
      </v-slide-group-item>

      <!-- Imágenes existentes (ya en el servidor) -->
      <v-slide-group-item v-for="(url, i) in existingUrls" :key="`existing-${i}`">
        <v-card class="ma-1">
          <ImagePreview
            :height="height"
            :width="width"
            :src="url"
            @open-preview="handleOpenPreview(i)"
          >
            <template #actions>
              <v-btn
                icon="mdi-close"
                size="x-small"
                variant="flat"
                color="surface"
                class="position-fixed top-0 mt-3 ml-2"
                @click.stop="removeExistingImage(i)"
              />
            </template>
          </ImagePreview>
        </v-card>
      </v-slide-group-item>

      <!-- Botón agregar (oculto en readonly) -->
      <v-slide-group-item v-if="!readonly">
        <v-card
          class="ma-1 d-flex flex-column align-center justify-center"
          :height="height"
          :width="width"
          @click.stop="addOverlay = true"
        >
          <!-- Overlay con opciones: cámara o archivo -->
          <v-overlay
            v-model="addOverlay"
            contained
            class="d-flex align-center justify-center"
            scrim="primary"
          >
            <v-btn-toggle color="primary">
              <v-btn icon="mdi-camera-outline" rounded="0" @click.stop="openCamera" />
              <v-btn icon="mdi-image-outline" rounded="0" @click.stop="openFilePicker" />
            </v-btn-toggle>
          </v-overlay>
          <v-icon icon="mdi-plus" size="40" class="opacity-60" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <!-- Previsualizar imagenes -->
    <ImageZoomDialog v-model="dialogActive" :images="allImages" :initial-index="selectedIndex" />

    <!-- Dialog de cámara -->
    <v-dialog v-model="dialogCamera" :width="600" scrollable>
      <CameraCapture @capture="onCameraCapture" @close="dialogCamera = false" />
    </v-dialog>

    <!-- Input de archivo nativo (invisible) -->
    <input
      ref="fileInputRef"
      type="file"
      multiple
      accept="image/jpeg,image/png,image/webp"
      class="d-none"
      @change="onFileChange"
    />
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref, onUnmounted, computed } from 'vue';
  import type { NewImage } from '../types/ImagePickerTypes';
  import CameraCapture from './CameraCapture.vue';
  import ImagePreview from './ImagePreview.vue';
  import ImageZoomDialog from './ImageZoomDialog.vue';

  // ─── Props ────────────────────────────────────────────────────────────

  const props = withDefaults(
    defineProps<{
      existingSrcs?: string[];
      readonly?: boolean;
      height?: string | number;
      width?: string | number;
    }>(),
    {
      existingSrcs: () => [],
      readonly: false,
      height: '175',
      width: '125',
    }
  );

  // ─── Template refs ────────────────────────────────────────────────────

  const fileInputRef = ref<HTMLInputElement | null>(null);

  // ─── Estado ───────────────────────────────────────────────────────────

  /** Imágenes nuevas seleccionadas / capturadas — aún no subidas */
  const newImages = ref<NewImage[]>([]);

  /** URLs de imágenes ya en el servidor */
  const existingUrls = ref<string[]>([...props.existingSrcs]);

  /** URLs de imágenes existentes que el usuario eliminó */
  const deletedUrls = ref<string[]>([]);

  const dialogCamera = ref(false);
  const addOverlay = ref(false);

  const allImages = computed(() => [
    ...existingUrls.value,
    ...newImages.value.map(img => img.preview),
  ]);
  const selectedIndex = ref(0);
  const dialogActive = ref(false);

  // ─── Acciones de cámara ───────────────────────────────────────────────

  function openCamera(): void {
    addOverlay.value = false;
    dialogCamera.value = true;
  }

  function onCameraCapture(file: File): void {
    addImageFromFile(file);
  }

  // ─── Acciones de archivo ──────────────────────────────────────────────

  function openFilePicker(): void {
    addOverlay.value = false;
    fileInputRef.value?.click();
  }

  function onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    Array.from(input.files).forEach(addImageFromFile);
    // Resetear input para permitir seleccionar el mismo archivo de nuevo
    input.value = '';
  }

  // ─── Generación de preview ────────────────────────────────────────────

  function addImageFromFile(file: File): void {
    const reader = new FileReader();
    reader.onload = e => {
      const preview = e.target?.result as string;
      if (preview) newImages.value.push({ file, preview });
    };
    reader.readAsDataURL(file);
  }

  // ─── Eliminación ──────────────────────────────────────────────────────

  function removeNewImage(index: number): void {
    newImages.value.splice(index, 1);
  }

  function removeExistingImage(index: number): void {
    const [removed] = existingUrls.value.splice(index, 1);
    deletedUrls.value.push(removed);
  }

  // ─── API pública para el padre ────────────────────────────────────────

  function reset(): void {
    newImages.value = [];
    existingUrls.value = [...props.existingSrcs];
    deletedUrls.value = [];
  }

  /**
   * El padre accede a estos valores con ref cuando va a guardar:
   *
   *   const pickerRef = ref()
   *   const { newFiles, deletedUrls } = pickerRef.value
   *   await productService.uploadImages(newFiles)
   *   await productService.deleteImages(deletedUrls)
   */
  defineExpose({
    /** File[] listos para subir al backend */
    get newFiles() {
      return newImages.value.map(img => img.file);
    },
    /** URLs de imágenes existentes eliminadas por el usuario */
    get deletedUrls() {
      return deletedUrls.value;
    },
    reset,
  });

  /**
   * Abre el preview en la posición correcta de la lista unificada
   */
  function handleOpenPreview(globalIndex: number) {
    selectedIndex.value = globalIndex;
    dialogActive.value = true;
  }

  // ─── Limpieza ─────────────────────────────────────────────────────────

  onUnmounted(reset);
</script>
