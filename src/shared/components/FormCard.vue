<template>
  <v-card>
    <v-card-text>
      <v-icon v-if="icon" :icon="icon" opacity=".7" class="mr-2"></v-icon>
      <span class="text-body-1 font-weight-bold text-medium-emphasis" v-text="title"></span>
      <div class="pt-4">
        <slot></slot>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
  defineProps<{
    title: string;
    icon: string;
  }>();
</script>
