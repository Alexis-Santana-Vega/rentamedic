<template>
  <v-app-bar order="2">
    <template #prepend>
      <v-app-bar-nav-icon @click="openDrawer" />
    </template>
    <v-app-bar-title>Dashboard</v-app-bar-title>
    <v-progress-linear
      :active="state.isLoading"
      indeterminate
      location="bottom"
      absolute
    ></v-progress-linear>
    <template #append>
      <SearchButton />
      <ThemeButton />
      <RoleButton />
      <LanguageButton />
    </template>
  </v-app-bar>
  <LayoutDrawer
    v-model="state.drawer"
    :rail="state.rail"
    :menu-items="menuItems"
    :route-name="router.name"
  />
  <router-view v-slot="{ Component, route }" @loading-change="state.isLoading = $event">
    <v-fade-transition mode="out-in">
      <component :is="Component" :key="route.path"></component>
    </v-fade-transition>
  </router-view>
</template>
<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  import ThemeButton from '../components/ThemeButton.vue';
  import SearchButton from '../components/SearchButton.vue';
  import { useRoute } from 'vue-router';
  import RoleButton from '../components/RoleButton.vue';
  import LanguageButton from '../components/LanguageButton.vue';
  import LayoutDrawer from '../components/LayoutDrawer.vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  const router = useRoute();
  const { mdAndDown } = useDisplay();
  const state = reactive({
    drawer: true,
    drawerCart: true,
    rail: true,
    isLoading: false,
  });
  const { t } = useTypedLocale();
  const menuItems = computed(() => [
    //{ title: 'Inicio', icon: 'mdi-home-outline', to: { name: 'summary' } },
    //{ title: 'Buscar', icon: 'mdi-magnify', to: { name: 'search' } },
    { title: t('nav.equipment'), icon: 'mdi-desktop-classic', to: { name: 'equipment' } },
    { title: t('nav.category'), icon: 'mdi-tag-outline', to: { name: 'category' } },
    { title: t('nav.supplier'), icon: 'mdi-handshake-outline', to: { name: 'supplier' } },
    { title: t('nav.inbound'), icon: 'mdi-elevator-down', to: { name: 'inbound' } },
    { title: t('nav.outbound'), icon: 'mdi-elevator-up', to: { name: 'outbound' } },
    { title: t('nav.user'), icon: 'mdi-account-multiple-outline', to: { name: 'user' } },
  ]);
  const openDrawer = (): void => {
    if (mdAndDown.value) {
      state.drawer = !state.drawer;
      state.rail = false;
    } else {
      state.rail = !state.rail;
    }
  };
  const initialize = () => {
    state.rail = !mdAndDown.value;
    state.drawer = !mdAndDown.value;
  };
  initialize();
</script>
