<template>
  <v-card :loading="loading" :disabled="disabled" :rounded="isCompact ? '0' : 'lg'">
    <template #loader="{ isActive }">
      <v-progress-linear :active="isActive" :color="color" indeterminate />
    </template>

    <v-toolbar :class="isCompact ? '' : 'vss-movable'" density="comfortable">
      <v-avatar :icon="icon" class="ml-4" />
      <v-toolbar-title class="vss-movable text-medium-emphasis">
        {{ title }}
      </v-toolbar-title>
      <v-btn icon="mdi-close" @click="emit('close')" />

      <template v-if="extension" #extension>
        <slot name="extension" />
      </template>
    </v-toolbar>

    <v-card-text class="bg-background pt-6">
      <slot />
    </v-card-text>

    <v-card-actions v-if="actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useDisplay } from 'vuetify';

  const props = defineProps<{
    title?: string;
    icon?: string;
    color?: string;
    loading?: boolean;
    disabled?: boolean;
    actions?: boolean;
    fullscreen?: boolean;
    extension?: boolean;
  }>();

  const emit = defineEmits<{
    close: [];
  }>();

  const { mobile } = useDisplay();

  const isCompact = computed(() => props.fullscreen || mobile.value);
</script>
