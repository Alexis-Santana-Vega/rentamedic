<template>
  <div>
    <section class="py-16 bg-surface">
      <v-container>
        <div class="text-display-medium font-weight-black text-center text-medium-emphasis">
          {{ t('public.aboutUs.title') }}
        </div>
      </v-container>
    </section>

    <section class="py-16">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="h-100 pa-8">
              <div class="text-title-large font-weight-black mb-4 text-primary">
                {{ t('public.aboutUs.mission.title') }}
              </div>
              <div>
                {{ t('public.aboutUs.mission.description') }}
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="h-100 pa-8">
              <div class="text-title-large font-weight-black mb-4 text-primary">
                {{ t('public.aboutUs.vision.title') }}
              </div>
              <div>
                {{ t('public.aboutUs.vision.description') }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-16 bg-surface">
      <v-container>
        <div class="text-title-large text-medium-emphasis font-weight-black text-center mb-12">
          {{ t('public.aboutUs.values.title') }}
        </div>
        <v-row>
          <v-col v-for="(value, index) in values" :key="index" cols="12" sm="6" md="3">
            <v-card class="h-100 text-center pa-6">
              <v-icon size="48" color="primary" class="mb-4"> {{ value.icon }} </v-icon>
              <div class="font-weight-bold mb-3">
                {{ value.name }}
              </div>
              <p>
                {{ value.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-16">
      <v-container>
        <div class="text-title-large font-weight-black text-medium-emphasis text-center mb-4">
          {{ t('public.aboutUs.team.title') }}
        </div>
        <p class="text-center mb-12">
          {{ t('public.aboutUs.team.description') }}
        </p>
        <v-row>
          <v-col v-for="(member, index) in members" :key="index" cols="12" sm="6" md="4">
            <v-card class="h-100 text-center pa-6">
              <v-icon size="64" color="primary" class="mb-4">
                {{ member.icon }}
              </v-icon>
              <h3 class="text-h6 font-weight-bold mb-2">
                {{ member.name }}
              </h3>
              <p class="text-subtitle-2 text-primary font-weight-bold mb-3">
                {{ member.role }}
              </p>
              <p class="text-body-2 text-medium-emphasis">
                {{ member.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';

  const { t } = useTypedLocale();

  const values = computed(() => [
    {
      name: t('public.aboutUs.values.accessibility.name'),
      description: t('public.aboutUs.values.accessibility.description'),
      icon: 'mdi-earth',
    },
    {
      name: t('public.aboutUs.values.reliability.name'),
      description: t('public.aboutUs.values.reliability.description'),
      icon: 'mdi-shield-check-outline',
    },
    {
      name: t('public.aboutUs.values.transparency.name'),
      description: t('public.aboutUs.values.transparency.description'),
      icon: 'mdi-eye-outline',
    },
    {
      name: t('public.aboutUs.values.excellence.name'),
      description: t('public.aboutUs.values.excellence.description'),
      icon: 'mdi-star-circle-outline',
    },
  ]);

  const members = computed(() => [
    {
      name: t('public.aboutUs.team.members.expertManagement.name'),
      description: t('public.aboutUs.team.members.expertManagement.description'),
      icon: 'mdi-crown-outline',
      role: t('public.aboutUs.team.members.expertManagement.role'),
    },
    {
      name: t('public.aboutUs.team.members.healthSpecialists.name'),
      description: t('public.aboutUs.team.members.healthSpecialists.description'),
      icon: 'mdi-stethoscope',
      role: t('public.aboutUs.team.members.healthSpecialists.role'),
    },
    {
      name: t('public.aboutUs.team.members.customerSupport.name'),
      description: t('public.aboutUs.team.members.customerSupport.description'),
      icon: 'mdi-headset',
      role: t('public.aboutUs.team.members.customerSupport.role'),
    },
  ]);
</script>
