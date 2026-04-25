<template>
  <div>
    <section class="py-16 bg-surface">
      <v-container>
        <div class="text-display-medium font-weight-black text-center text-medium-emphasis">
          {{ t('public.contact.title') }}
        </div>
        <p class="text-center">
          {{ t('public.contact.subtitle') }}
        </p>
      </v-container>
    </section>
    <!-- Content -->
    <section class="py-16">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="pa-6" :loading="isSubmitting" :disabled="isSubmitting">
              <div class="text-title-large font-weight-bold text-medium-emphasis mb-6">
                {{ t('public.contact.form.submit') }}
              </div>
              <v-form ref="form" v-model="isFormValid" @submit.prevent="handleSubmit">
                <v-row density="compact">
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedForm.name"
                      :label="t('public.contact.form.nameLabel')"
                      :placeholder="t('public.contact.form.namePlaceholder')"
                      prepend-inner-icon="mdi-account-outline"
                      :rules="formRules.name"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="editedForm.email"
                      :label="t('public.contact.form.emailLabel')"
                      :placeholder="t('public.contact.form.emailPlaceholder')"
                      prepend-inner-icon="mdi-email-outline"
                      type="email"
                      :rules="formRules.email"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="editedForm.phone"
                      :label="t('public.contact.form.phoneLabel')"
                      :placeholder="t('public.contact.form.phonePlaceholder')"
                      prepend-inner-icon="mdi-phone-outline"
                      :rules="formRules.phone"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="editedForm.subject"
                      :label="t('public.contact.form.subjectLabel')"
                      :placeholder="t('public.contact.form.subjectPlaceholder')"
                      prepend-inner-icon="mdi-format-title"
                      :rules="formRules.subject"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="editedForm.message"
                      :label="t('public.contact.form.messageLabel')"
                      :placeholder="t('public.contact.form.messagePlaceholder')"
                      prepend-inner-icon="mdi-message-outline"
                      :rules="formRules.message"
                      rows="5"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-btn-custom
                      type="submit"
                      size="large"
                      block
                      :disabled="!isFormValid || isSubmitting"
                    >
                      {{ t('public.contact.form.submit') }}
                    </v-btn-custom>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>

          <!-- Contact Information -->
          <v-col cols="12" md="5">
            <v-card class="pa-6 h-100">
              <div class="text-title-large font-weight-bold text-medium-emphasis mb-6">
                {{ t('public.contact.info.title') }}
              </div>
              <v-card variant="flat">
                <v-list lines="two">
                  <v-list-item
                    v-for="(item, i) in contactItems"
                    :key="i"
                    :prepend-icon="item.icon"
                    class="mb-2"
                    color="primary"
                  >
                    <v-list-item-title class="text-subtitle-2 font-weight-bold">
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-body-2 opacity-80">
                      {{ item.subtitle }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <v-divider class="my-6"></v-divider>

                <div class="text-title-large font-weight-bold text-medium-emphasis mb-6">
                  {{ t('public.contact.support.title') }}
                </div>

                <v-list lines="two">
                  <v-list-item
                    v-for="(item, i) in supportHours"
                    :key="i"
                    prepend-icon="mdi-clock-outline"
                    class="mb-2"
                    color="primary"
                  >
                    <v-list-item-title class="text-subtitle-2 font-weight-bold">
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-body-2 opacity-80">
                      {{ item.schedule }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { useSwal } from '@/shared/composables/useSwal';
  import { createValidators } from '@/shared/utils/validators';

  const { t } = useTypedLocale();
  const { toast } = useSwal();
  const v = createValidators(t);

  const isFormValid = ref(false);
  const isSubmitting = ref(false);

  interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }
  const defaultForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  const editedForm = ref<ContactForm>({ ...defaultForm });

  const form = ref();

  const formRules = computed(() => ({
    name: [v.required(), v.maxLength(50)],
    email: [v.required(), v.onlyEmail()],
    phone: [v.required(), v.onlyNumbers(), v.maxLength(12)],
    subject: [v.required(), v.maxLength(60)],
    message: [v.required(), v.maxLength(500)],
  }));

  const handleSubmit = async () => {
    isSubmitting.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast('success', t('public.contact.form.success'));

      editedForm.value = { ...defaultForm };
      isFormValid.value = false;
      form.value.resetValidation();
    } catch (error) {
      console.log(error);
      toast('error', t('public.contact.form.error'));
    } finally {
      isSubmitting.value = false;
    }
  };

  const contactItems = computed(() => [
    {
      icon: 'mdi-email-outline',
      title: t('public.contact.info.email'),
      subtitle: 'contacto@rentamedic.com',
      href: 'mailto:contacto@rentamedic.com',
    },
    {
      icon: 'mdi-phone-outline',
      title: t('public.contact.info.phone'),
      subtitle: '+52 773 213 4323',
      href: 'tel:+527732134323',
    },
    {
      icon: 'mdi-map-marker-outline',
      title: t('public.contact.info.address'),
      subtitle: 'Av. Gomez Morín 23 Tula de Allende CP. 34560, Hidalgo, México',
      href: 'https://maps.google.com/?q=Av. Gomez Morín 23 Tula de Allende',
    },
  ]);

  const supportHours = computed(() => [
    {
      title: t('public.contact.support.week.title'),
      schedule: t('public.contact.support.week.schedule'),
    },
    {
      title: t('public.contact.support.saturday.title'),
      schedule: t('public.contact.support.saturday.schedule'),
    },
    {
      title: t('public.contact.support.sunday.title'),
      schedule: t('public.contact.support.sunday.schedule'),
    },
  ]);
</script>
