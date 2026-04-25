<template>
  <v-navigation-drawer v-model="drawerModel" :rail="rail" order="1">
    <div class="d-flex align-center py-1 ga-2 pl-2">
      <v-img src="@/assets/images/logo.webp" width="48" height="48"></v-img>
      <div class="font-weight-black text-title-large text-medium-emphasis w-100">RentaMedic</div>
    </div>

    <v-list rounded="0">
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :title="item.title"
        :to="item.to"
        :active="item.to.name === routeName"
        rounded="0"
      >
        <template #prepend>
          <v-icon :icon="item.icon" class="ml-1"></v-icon>
        </template>

        <v-tooltip v-if="rail" activator="parent" location="end" :text="item.title" />
      </v-list-item>
    </v-list>

    <template #append>
      <div class="d-flex align-center py-1 pr-1 pl-2 ga-3">
        <div>
          <div
            class="rounded-circle font-weight-black bg-tertiary d-flex align-center justify-center"
            style="height: 48px; width: 48px"
          >
            AS
          </div>
        </div>

        <div style="white-space: nowrap">
          <div class="font-weight-bold text-medium-emphasis">Alexis Santana</div>
          <div class="text-label-medium text-medium-emphasis">Admin</div>
        </div>
      </div>

      <v-list rounded="0">
        <v-list-item rounded="0" @click="logout">
          <template #prepend>
            <v-icon icon="mdi-logout" class="ml-1"></v-icon>
          </template>

          <v-list-item-title>Cerrar sesión</v-list-item-title>

          <v-tooltip v-if="rail" activator="parent" location="end" text="Cerrar sesión" />
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { RouteRecordNameGeneric } from 'vue-router';

  type MenuItem = {
    title: string;
    icon: string;
    to: { name: string };
  };

  const props = defineProps<{
    modelValue: boolean;
    rail: boolean;
    menuItems: MenuItem[];
    routeName: RouteRecordNameGeneric;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const drawerModel = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  });

  const logout = (): void => {};
</script>
