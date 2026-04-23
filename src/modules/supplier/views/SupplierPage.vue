<template>
  <v-container fluid>
    <v-row>
      <!-- Resumen -->
      <v-col v-for="item in summary" :key="item.text" cols="12" sm="6" md="4" lg="4" xl="4">
        <SummaryCardV3
          :text="t(item.text as I18nKeys)"
          :number="item.number"
          :icon="item.icon"
          :color="item.color"
        >
        </SummaryCardV3>
      </v-col>

      <v-col cols="12">
        <TableCard
          icon="mdi-handshake-outline"
          :title="t('supplier.page.title')"
          :subtitle="t('supplier.page.subtitle')"
        >
          <v-row density="compact">
            <v-col cols="12" md="6" lg="8" xl="9">
              <IteratorHeader>
                <v-btn-custom prepend-icon="mdi-plus" :block="mobile" @click="openSupplierDialog()">
                  {{ t('supplier.actions.add') }}
                </v-btn-custom>
              </IteratorHeader>
            </v-col>
            <v-col cols="12" md="6" lg="4" xl="3">
              <IteratorHeader>
                <v-text-field
                  v-model="state.search"
                  :placeholder="t('supplier.search')"
                  single-line
                  hide-details
                  clearable
                  prepend-inner-icon="mdi-magnify"
                />
              </IteratorHeader>
            </v-col>

            <v-col cols="12">
              <v-data-table
                :items="suppliers"
                :headers="supplierHeaders"
                :search="state.search"
                :loading="state.loadingTable"
              >
                <template #loading>
                  <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
                <template #item.name="{ value }">
                  <span class="font-weight-medium">{{ value }}</span>
                </template>
                <template #item.active="{ value }">
                  <v-chip
                    :color="value ? 'success' : 'error'"
                    :text="value ? t('supplier.table.active') : t('supplier.table.inactive')"
                  />
                </template>
                <template #item.actions="{ item }">
                  <TooltipButton
                    :text="t('supplier.actions.delete')"
                    icon="mdi-delete-outline"
                    color="error"
                    @click="confirmDeleteSupplier(item)"
                  />
                  <TooltipButton
                    icon="mdi-circle-edit-outline"
                    :text="t('supplier.actions.edit')"
                    color="secondary"
                    @click="openSupplierDialog(item)"
                  />
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </TableCard>
      </v-col>
    </v-row>

    <DialogCard
      v-model="state.dialogSupplier"
      :title="supplierDialogMeta.title"
      :icon="supplierDialogMeta.icon"
      :loading="state.loadingSupplierForm"
      :disabled="state.loadingSupplierForm"
      width="1000"
      actions
      @close="closeSupplierDialog"
    >
      <v-form v-model="state.supplierFormValid" @submit.prevent>
        <v-row>
          <!-- Datos generales -->
          <v-col cols="12">
            <FormCard :title="t('supplier.form.generalData')">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedSupplier.name"
                    :label="t('supplier.form.name')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.name"
                    prepend-inner-icon="mdi-handshake-outline"
                  />
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="editedSupplier.rfc"
                    :label="t('supplier.form.rfc')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.rfc"
                    prepend-inner-icon="mdi-file-outline"
                  />
                </v-col>
                <v-col cols="12" md="6" lg="8">
                  <v-checkbox
                    v-model="editedSupplier.active"
                    :label="t('supplier.form.active')"
                    :color="supplierDialogMeta.color"
                    hide-details
                    single-line
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Información de contacto -->
          <v-col cols="12">
            <FormCard :title="t('supplier.form.contactInfo')">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedSupplier.contactName"
                    :label="t('supplier.form.contactName')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.contactName"
                    prepend-inner-icon="mdi-account-outline"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editedSupplier.mobilePhone"
                    :label="t('supplier.form.mobilePhone')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.mobilePhone"
                    prepend-inner-icon="mdi-phone-outline"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editedSupplier.phoneOffice"
                    :label="t('supplier.form.phoneOffice')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.phoneOffice"
                    prepend-inner-icon="mdi-deskphone"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editedSupplier.phoneExt"
                    :label="t('supplier.form.phoneExt')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.phoneExt"
                    prepend-inner-icon="mdi-card-account-phone-outline"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedSupplier.email"
                    :label="t('supplier.form.email')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.email"
                    prepend-inner-icon="mdi-email-outline"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Dirección -->
          <v-col cols="12">
            <FormCard :title="t('supplier.form.address')">
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editedSupplier.country"
                    :label="t('supplier.form.country')"
                    :color="supplierDialogMeta.color"
                    prepend-inner-icon="mdi-earth"
                    :items="mockCountries"
                    item-title="name"
                    item-value="id"
                    :rules="supplierRules.country"
                    @update:model-value="editedSupplier.state = ''"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="editedSupplier.state"
                    :label="t('supplier.form.state')"
                    :color="supplierDialogMeta.color"
                    prepend-inner-icon="mdi-town-hall"
                    :items="statesByCountry"
                    item-title="name"
                    item-value="id"
                    :rules="supplierRules.state"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="editedSupplier.zipCode"
                    :label="t('supplier.form.zipCode')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.zipCode"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedSupplier.city"
                    :label="t('supplier.form.city')"
                    :color="supplierDialogMeta.color"
                    prepend-inner-icon="mdi-city-variant-outline"
                    :rules="supplierRules.city"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedSupplier.neighborhood"
                    :label="t('supplier.form.neighborhood')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.neighborhood"
                    prepend-inner-icon="mdi-home-city-outline"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedSupplier.address"
                    :label="t('supplier.form.addressLine')"
                    :color="supplierDialogMeta.color"
                    :rules="supplierRules.address"
                    prepend-inner-icon="mdi-home-city-outline"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <v-col cols="12" class="text-label-medium text-disabled">
            {{ t('common.requiredFields') }}
          </v-col>
        </v-row>
      </v-form>

      <template #actions>
        <v-btn-custom
          variant="tonal"
          :color="supplierDialogMeta.color"
          @click="closeSupplierDialog"
        >
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          variant="flat"
          :color="supplierDialogMeta.color"
          :disabled="!state.supplierFormValid"
          @click="saveSupplier"
        >
          {{ t('common.save') }}
        </v-btn-custom>
      </template>
    </DialogCard>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, nextTick, onMounted } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import type {
    SummaryCard,
    SupplierForm,
    SupplierLightResponse,
  } from '@/modules/supplier/types/SupplierTypes';
  import TableCard from '@/shared/components/TableCard.vue';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import type { I18nKeys } from '@/core/i18n/i18n-keys';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import {
    mockCountries,
    mockStates,
    mockSummary,
    mockSuppliersById,
    mockSuppliersLight,
  } from '../MockData';
  import SummaryCardV3 from '@/shared/components/SummaryCardV3.vue';

  const { t } = useTypedLocale();
  const { mobile } = useDisplay();
  const v = createValidators(t);

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  const { toast, confirm } = useSwal();

  const summary = ref<SummaryCard[]>([]);

  const editedSupplierIndex = ref(-1);
  const suppliers = ref<SupplierLightResponse[]>([]);

  const state = reactive({
    // General
    search: '',
    loadingTable: false,
    dialogSupplier: false,
    supplierFormValid: false,
    loadingSupplierForm: false,
  });

  const defaultSupplier: SupplierForm = {
    id: '',
    name: '',
    rfc: '',
    active: true,
    contactName: '',
    mobilePhone: '',
    phoneOffice: '',
    phoneExt: '',
    email: '',
    country: '',
    state: '',
    zipCode: '',
    city: '',
    neighborhood: '',
    address: '',
  };
  const editedSupplier = ref<SupplierForm>({ ...defaultSupplier });

  const supplierHeaders = computed(() => [
    { key: 'name', title: t('supplier.headers.name') },
    {
      key: 'mobile-phone',
      title: t('supplier.headers.mobilePhone'),
      value: 'mobilePhone',
    },
    { key: 'email', title: t('supplier.headers.email') },
    { key: 'active', title: t('supplier.headers.status') },
    {
      key: 'actions',
      title: t('supplier.headers.actions'),
      sortable: false,
      align: 'end' as const,
    },
  ]);

  const supplierDialogMeta = computed(() => {
    const isNew = editedSupplierIndex.value === -1;
    return {
      title: isNew ? t('supplier.dialog.titleNew') : t('supplier.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const supplierRules = computed(() => ({
    name: [v.required(), v.maxLength(120, t('supplier.form.name'))],
    rfc: [v.required(), v.maxLength(13, t('supplier.form.rfc'))],
    contactName: [v.required(), v.maxLength(60, t('supplier.form.contactName'))],
    mobilePhone: [
      v.required(),
      v.maxLength(15, t('supplier.form.mobilePhone')),
      v.onlyNumbers(t('supplier.form.mobilePhone')),
    ],
    phoneOffice: [
      v.maxLength(15, t('supplier.form.phoneOffice')),
      v.onlyNumbers(t('supplier.form.phoneOffice')),
    ],
    phoneExt: [
      v.maxLength(10, t('supplier.form.phoneExt')),
      v.onlyNumbers(t('supplier.form.phoneExt')),
    ],
    email: [
      v.required(),
      v.maxLength(60, t('supplier.form.email')),
      v.onlyEmail(t('supplier.form.email')),
    ],
    country: [v.required()],
    state: [v.required()],
    zipCode: [v.required(), v.maxLength(10, t('supplier.form.zipCode'))],
    city: [v.required(), v.maxLength(50, t('supplier.form.city'))],
    neighborhood: [v.required(), v.maxLength(50, t('supplier.form.neighborhood'))],
    address: [v.required(), v.maxLength(200, t('supplier.form.addressLine'))],
  }));

  function openSupplierDialog(item?: SupplierLightResponse): void {
    if (item) {
      emit('loadingChange', true);
      setTimeout(() => {
        editedSupplierIndex.value = suppliers.value.indexOf(item);
        editedSupplier.value = { ...mockSuppliersById.find(s => s.id === item.id)! };
        state.dialogSupplier = true;
        emit('loadingChange', false);
      }, 1500);
    } else {
      state.dialogSupplier = true;
    }
  }

  function confirmDeleteSupplier(item: SupplierLightResponse): void {
    confirm(
      t('supplier.dialog.deleteTitle', { name: item.name }),
      'warning',
      t('supplier.dialog.deleteMessage')
    )
      .then(result => {
        if (result.isConfirmed) {
          suppliers.value = suppliers.value.filter(s => s.id !== item.id);
          toast('success', t('supplier.notifications.deleted'));
        }
      })
      .catch(() => toast('error', t('supplier.notifications.deleteError')));
  }
  function closeSupplierDialog(): void {
    state.dialogSupplier = false;
    nextTick(() => {
      editedSupplier.value = { ...defaultSupplier };
      editedSupplierIndex.value = -1;
    });
  }

  function saveSupplier(): void {
    state.loadingSupplierForm = true;
    setTimeout(() => {
      if (editedSupplierIndex.value === -1) {
        suppliers.value.push({
          id: crypto.randomUUID(),
          name: editedSupplier.value.name,
          mobilePhone: editedSupplier.value.mobilePhone,
          email: editedSupplier.value.email,
          active: editedSupplier.value.active,
        });
      } else {
        Object.assign(suppliers.value[editedSupplierIndex.value], {
          name: editedSupplier.value.name,
          mobilePhone: editedSupplier.value.mobilePhone,
          email: editedSupplier.value.email,
          active: editedSupplier.value.active,
        });
      }
      state.loadingSupplierForm = false;
      closeSupplierDialog();
    }, 1000);
  }

  const statesByCountry = computed(() => {
    if (!editedSupplier.value.country) return [];
    return mockStates.filter(s => s.countryId === editedSupplier.value.country);
  });

  onMounted(() => {
    // TODO: reemplazar con llamadas reales al service
    state.loadingTable = true;
    setTimeout(() => {
      summary.value = mockSummary;
      suppliers.value = mockSuppliersLight;
      state.loadingTable = false;
    }, 1000);
  });
</script>
