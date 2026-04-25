<template>
  <div>
    <section class="py-16 bg-surface">
      <v-container class="d-flex flex-column align-center">
        <v-avatar size="120" variant="text" class="mb-4">
          <v-img src="@/assets/images/logo.webp" />
        </v-avatar>
        <div class="text-display-medium font-weight-black text-medium-emphasis text-center">
          {{ t('public.home.title') }}
        </div>
        <p class="text-body-large text-medium-emphasis font-weight-bold">
          {{ t('public.home.subtitle') }}
        </p>
        <v-btn-custom size="x-large">
          {{ t('public.home.button') }}
        </v-btn-custom>
      </v-container>
    </section>

    <section class="py-16">
      <v-container>
        <div class="text-title-large font-weight-black text-center mb-12">
          {{ t('public.home.whyChoose') }}
        </div>
        <v-row>
          <v-col v-for="(feature, key) in features" :key="key" cols="12" sm="6" md="6" lg="3">
            <v-card class="h-100 text-center pa-6">
              <v-icon size="48" class="mb-4" color="primary">
                {{ feature.icon }}
              </v-icon>
              <div class="text-title-medium font-weight-bold mb-3">
                {{ feature.title }}
              </div>
              <p class="text-body-2 text-medium-emphasis">
                {{ feature.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-16 px-4 bg-primary text-center">
      <h2 class="text-h4 font-weight-black text-white mb-6">{{ t('public.home.cta.title') }}</h2>
      <v-btn color="white" size="x-large">
        {{ t('public.home.cta.button') }}
      </v-btn>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';

  const { t } = useTypedLocale();

  const features = computed(() => [
    {
      title: t('public.home.features.catalog.title'),
      description: t('public.home.features.catalog.description'),
      icon: 'mdi-package-variant-closed',
    },
    {
      title: t('public.home.features.availability.title'),
      description: t('public.home.features.availability.description'),
      icon: 'mdi-clock-outline',
    },
    {
      title: t('public.home.features.easy.title'),
      description: t('public.home.features.easy.description'),
      icon: 'mdi-check-decagram-outline',
    },
    {
      title: t('public.home.features.support.title'),
      description: t('public.home.features.support.description'),
      icon: 'mdi-headset',
    },
  ]);
</script>
