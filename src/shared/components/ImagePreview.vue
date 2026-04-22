<template>
  <v-card
    :height="height"
    :width="width"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :rounded="rounded"
    :image="src"
    class="cursor-pointer"
    @click="$emit('open-preview', src)"
  >
    <slot name="actions" />
  </v-card>
</template>

<script setup lang="ts">
  defineProps<{
    src: string;
    height?: string | number;
    width?: string | number;
    maxHeight?: string;
    maxWidth?: string;
    rounded?: string;
  }>();

  defineEmits(['open-preview']);
</script>
