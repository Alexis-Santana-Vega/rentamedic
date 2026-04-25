<template>
  <v-app-bar order="2">
    <template #prepend>
      <v-app-bar-nav-icon v-if="smAndDown" @click="openDrawer" />
      <v-avatar variant="text" class="ml-2 mr-2">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <span v-if="!smAndDown" class="text-title-large font-weight-black text-medium-emphasis"
        >Rentamedic</span
      >
    </template>
    <v-tabs v-if="!smAndDown">
      <v-tab
        v-for="(item, index) in menuItems"
        :key="index"
        :prepend-icon="item.icon"
        :to="item.to"
        :value="index"
        hide-slider
        >{{ item.title }}</v-tab
      >
    </v-tabs>
    <v-progress-linear
      :active="state.isLoading"
      indeterminate
      location="bottom"
      absolute
    ></v-progress-linear>
    <template #append>
      <SearchButton />
      <ThemeButton />
      <LanguageButton />
      <v-btn icon="mdi-account-outline" :to="{ name: 'login' }"></v-btn>
      <v-btn icon="mdi-cart-outline" @click="state.drawerCart = !state.drawerCart"></v-btn>
    </template>
  </v-app-bar>
  <LayoutDrawer
    v-if="smAndDown"
    v-model="state.drawer"
    :rail="state.rail"
    :menu-items="menuItems"
    :route-name="router.name"
  />
  <CartDrawer v-model="state.drawerCart" />
  <router-view v-slot="{ Component, route }" @loading-change="state.isLoading = $event">
    <v-fade-transition mode="out-in">
      <component :is="Component" :key="route.path"></component>
    </v-fade-transition>
  </router-view>
</template>
<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import SearchButton from '../components/SearchButton.vue';
  import ThemeButton from '../components/ThemeButton.vue';
  import LanguageButton from '../components/LanguageButton.vue';
  import { useDisplay } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import LayoutDrawer from '../components/LayoutDrawer.vue';
  import CartDrawer from '../components/CartDrawer.vue';
  import { useRoute } from 'vue-router';

  const router = useRoute();
  const { smAndDown } = useDisplay();
  const { t } = useTypedLocale();
  const state = reactive({
    drawer: false,
    drawerCart: false,
    rail: true,
    isLoading: false,
  });
  const menuItems = computed(() => [
    { title: t('nav.home'), icon: 'mdi-home-outline', to: { name: 'home' } },
    { title: t('nav.search'), icon: 'mdi-magnify', to: { name: 'search' } },
    { title: t('nav.about'), icon: 'mdi-information-variant', to: { name: 'about' } },
    { title: t('nav.contact'), icon: 'mdi-email-outline', to: { name: 'contact' } },
  ]);
  const openDrawer = (): void => {
    state.drawer = !state.drawer;
    state.rail = false;
  };
</script>
