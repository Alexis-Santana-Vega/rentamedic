<template>
  <v-dialog :model-value="modelValue" fullscreen scrollable @update:model-value="closeDialog">
    <v-card
      rounded="0"
      class="h-100 w-100 d-flex flex-column"
      @keydown.left="prevImage"
      @keydown.right="nextImage"
    >
      <v-toolbar color="surface">
        <template #prepend>
          <v-btn-group rounded="lg" variant="tonal">
            <v-btn
              icon="mdi-minus"
              rounded="0"
              color="secondary"
              :disabled="zoomLevel <= 200"
              @click="zoomLevel -= 100"
            />
            <v-btn
              icon="mdi-plus"
              rounded="0"
              color="tertiary"
              :disabled="zoomLevel >= 400"
              @click="zoomLevel += 100"
            />
          </v-btn-group>
          <span class="ml-2 font-weight-medium">
            <v-icon icon="mdi-magnify-plus-outline"></v-icon> {{ zoomLevel / 100 }}
          </span>
        </template>
        <div v-if="images.length > 1">
          <v-btn-group rounded="lg" variant="tonal">
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              :disabled="currentIndex <= 0"
              @click="prevImage"
            />
            <v-btn
              icon="mdi-chevron-right"
              variant="text"
              :disabled="currentIndex >= images.length - 1"
              @click="nextImage"
            />
          </v-btn-group>
          <span class="ml-2 font-weight-medium"
            ><v-icon icon="mdi-image-multiple-outline"></v-icon> {{ currentIndex + 1 }} /
            {{ images.length }}</span
          >
        </div>
        <template #append>
          <v-btn icon="mdi-close" @click="closeDialog" />
        </template>
      </v-toolbar>

      <v-card-text class="d-flex align-center justify-center overflow-hidden">
        <div class="zoom-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
          <img :key="currentSrc" :src="currentSrc" class="zoom-image" :style="imageStyle" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';

  const props = defineProps<{
    modelValue: boolean;
    images: string[]; // Lista de URLs
    initialIndex: number; // Índice inicial
  }>();

  const emit = defineEmits(['update:modelValue']);

  // Estado interno
  const currentIndex = ref(props.initialIndex);
  const zoomLevel = ref(200);
  const isHovered = ref(false);
  const originX = ref(50);
  const originY = ref(50);

  // Sincronizar el índice cuando se abre el diálogo
  watch(
    () => props.initialIndex,
    newVal => {
      currentIndex.value = newVal;
    }
  );

  // Reiniciar zoom al cambiar de imagen
  watch(currentIndex, () => {
    isHovered.value = false;
  });

  const currentSrc = computed(() => props.images[currentIndex.value] || '');

  const imageStyle = computed(() => ({
    transform: isHovered.value ? `scale(${zoomLevel.value / 100})` : 'scale(1)',
    transformOrigin: `${originX.value}% ${originY.value}%`,
  }));

  function nextImage() {
    if (currentIndex.value < props.images.length - 1) currentIndex.value++;
  }

  function prevImage() {
    if (currentIndex.value > 0) currentIndex.value--;
  }

  function closeDialog() {
    emit('update:modelValue', false);
  }

  function handleMouseMove(e: MouseEvent): void {
    isHovered.value = true;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    originX.value = ((e.clientX - rect.left) / rect.width) * 100;
    originY.value = ((e.clientY - rect.top) / rect.height) * 100;
  }

  function handleMouseLeave(): void {
    isHovered.value = false;
  }
</script>

<style scoped>
  .zoom-container {
    position: relative;
    overflow: hidden;
    cursor: zoom-in;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  .zoom-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.2s ease-out;
    pointer-events: none;
  }
</style>
