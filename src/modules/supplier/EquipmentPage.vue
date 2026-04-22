<template>
  <v-container fluid>
    <v-row>
      <!-- Resumen -->
      <v-col v-for="item in summary" :key="item.text" cols="12" sm="6" md="6" lg="3" xl="3">
        <SummaryCardV3
          :text="t(item.text as I18nKeys)"
          :number="item.number"
          :icon="item.icon"
          :color="item.color"
          variant="text"
        >
        </SummaryCardV3>
      </v-col>

      <!-- Filtros -->
      <v-col cols="12">
        <TableCard icon="mdi-table-filter" :title="t('equipment.filters.title')">
          <template #append>
            <v-btn variant="flat" color="tertiary" icon="mdi-table-sync" />
          </template>
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="4" xl="3">
              <v-select
                v-model="state.filterCategory"
                :label="t('equipment.filters.category')"
                :items="categories"
                item-value="id"
                item-title="name"
                clearable
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4" xl="3">
              <v-select
                v-model="state.filterStatus"
                :label="t('equipment.filters.status')"
                :items="productStatusItems"
                clearable
                hide-details
              />
            </v-col>
          </v-row>
        </TableCard>
      </v-col>

      <v-col cols="12">
        <TableCard
          icon="mdi-hospital-box-outline"
          :title="t('equipment.page.title')"
          :subtitle="t('equipment.page.subtitle')"
        >
          <v-row density="compact">
            <v-col cols="12" md="6" lg="8" xl="9">
              <IteratorHeader>
                <v-btn-custom prepend-icon="mdi-plus" :block="mobile" @click="openProductDialog()">
                  {{ t('equipment.actions.add') }}
                </v-btn-custom>
              </IteratorHeader>
            </v-col>
            <v-col cols="12" md="6" lg="4" xl="3">
              <IteratorHeader>
                <v-text-field
                  v-model="state.search"
                  :placeholder="t('equipment.search')"
                  single-line
                  hide-details
                  clearable
                  prepend-inner-icon="mdi-magnify"
                />
              </IteratorHeader>
            </v-col>

            <v-col cols="12">
              <v-data-table
                :items="products"
                :headers="productHeaders"
                :search="state.search"
                :loading="state.loadingTable"
              >
                <template #item.code="{ value }">
                  <v-chip variant="text">{{ value }}</v-chip>
                </template>

                <template #item.name="{ item }">
                  <div class="font-weight-medium">{{ item.name }}</div>
                  <div class="text-caption">{{ item.description }}</div>
                </template>

                <template #item.category-name="{ value }">
                  <v-chip>{{ value }}</v-chip>
                </template>

                <template #item.status="{ value }">
                  <v-chip :color="productStatusColor(value.toUpperCase())">{{ value }}</v-chip>
                </template>

                <template #item.actions="{ item }">
                  <TooltipButton
                    icon="mdi-circle-edit-outline"
                    :text="t('equipment.actions.edit')"
                    color="secondary"
                    @click="openProductDialog(item)"
                  />
                  <v-menu>
                    <template #activator="{ props }">
                      <TooltipButton
                        :text="t('equipment.actions.more')"
                        icon="mdi-dots-vertical"
                        v-bind="props"
                      />
                    </template>
                    <v-sheet class="pa-2">
                      <v-list class="pa-0" density="comfortable">
                        <v-list-item
                          :title="t('equipment.actions.delete')"
                          prepend-icon="mdi-delete-outline"
                          @click="confirmDeleteProduct(item)"
                        />
                      </v-list>
                    </v-sheet>
                  </v-menu>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </TableCard>
      </v-col>
    </v-row>

    <DialogCard
      v-model="state.dialogProduct"
      :title="productDialogMeta.title"
      :icon="productDialogMeta.icon"
      :loading="state.loadingProductForm"
      :disabled="state.loadingProductForm"
      fullscreen
      actions
      @close="closeProductDialog"
    >
      <v-form v-model="state.productFormValid" @submit.prevent>
        <v-row>
          <!-- Información general -->
          <v-col cols="12">
            <FormCard :title="t('equipment.form.generalInfo')" icon="mdi-card-text-outline">
              <v-row>
                <v-col cols="12" md="4" lg="3">
                  <v-text-field
                    v-model="productForm.barcode"
                    :label="t('equipment.form.barcode')"
                    :color="productDialogMeta.color"
                    :rules="productRules.barcode"
                    prepend-inner-icon="mdi-identifier"
                    append-inner-icon="mdi-barcode-scan"
                    @click:append-inner="onScanBarcode"
                  />
                </v-col>
                <v-col cols="12" md="8" lg="3">
                  <v-select
                    v-model="productForm.categoryId"
                    :label="t('equipment.form.category')"
                    :color="productDialogMeta.color"
                    :rules="productRules.categoryId"
                    :items="categories"
                    item-value="id"
                    item-title="name"
                    prepend-inner-icon="mdi-tag-multiple-outline"
                  />
                </v-col>
                <v-col cols="12" md="8" lg="6">
                  <v-text-field
                    v-model="productForm.name"
                    :label="t('equipment.form.name')"
                    :color="productDialogMeta.color"
                    :rules="productRules.name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="productForm.shortDescription"
                    :label="t('equipment.form.shortDescription')"
                    :color="productDialogMeta.color"
                    :rules="productRules.shortDescription"
                    prepend-inner-icon="mdi-text-short"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="productForm.longDescription"
                    :label="t('equipment.form.longDescription')"
                    :color="productDialogMeta.color"
                    :rules="productRules.longDescription"
                    prepend-inner-icon="mdi-text-long"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Precios -->
          <v-col cols="12" sm="6" md="4" lg="4">
            <FormCard :title="t('equipment.form.prices')" icon="mdi-cash">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="productForm.purchasePrice"
                    :label="t('equipment.form.purchasePrice')"
                    :color="productDialogMeta.color"
                    :rules="productRules.purchasePrice"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="productForm.rentPrice"
                    :label="t('equipment.form.rentPrice')"
                    :color="productDialogMeta.color"
                    :rules="productRules.rentPrice"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Stock -->
          <v-col cols="12" sm="6" md="4" lg="4">
            <FormCard :title="t('equipment.form.stock')" icon="mdi-list-box-outline">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="productForm.maxStock"
                    :label="t('equipment.form.maxStock')"
                    :color="productDialogMeta.color"
                    :rules="productRules.maxStock"
                    type="number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="productForm.minStock"
                    :label="t('equipment.form.minStock')"
                    :color="productDialogMeta.color"
                    :rules="productRules.minStock"
                    type="number"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Disponibilidad -->
          <v-col cols="12" sm="12" md="4" lg="4">
            <FormCard
              :title="t('equipment.form.availability')"
              class="h-100"
              icon="mdi-store-cog-outline"
            >
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="productForm.type"
                    :label="t('equipment.form.productOffer')"
                    :color="productDialogMeta.color"
                    :items="productTypeItems"
                    :rules="productRules.type"
                    chips
                    multiple
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="productForm.active"
                    :label="t('equipment.form.active')"
                    :color="productDialogMeta.color"
                    hide-details
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Imágenes -->
          <v-col cols="12">
            <FormCard :title="t('equipment.form.images')" icon="mdi-image-outline">
              <photo-picker-multiple />
            </FormCard>
          </v-col>

          <!-- Proveedores -->
          <v-col cols="12">
            <FormCard :title="t('equipment.form.providers')" icon="mdi-handshake-outline">
              <v-row>
                <v-col cols="12" md="6" lg="8" xl="9">
                  <IteratorHeader>
                    <v-btn-custom
                      prepend-icon="mdi-plus"
                      color="tertiary"
                      :block="mobile"
                      @click="openProviderDialog()"
                    >
                      {{ t('equipment.providers.add') }}
                    </v-btn-custom>
                  </IteratorHeader>
                </v-col>
                <v-col cols="12" md="6" lg="4" xl="3">
                  <IteratorHeader>
                    <v-text-field
                      v-model="state.searchProvider"
                      :placeholder="t('equipment.providers.search')"
                      single-line
                      hide-details
                      clearable
                      prepend-inner-icon="mdi-magnify"
                    />
                  </IteratorHeader>
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    :items="productForm.providers"
                    :headers="providerHeaders"
                    :search="state.searchProvider"
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
        <v-btn-custom variant="tonal" :color="productDialogMeta.color" @click="closeProductDialog">
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          variant="flat"
          :color="productDialogMeta.color"
          :loading="state.loadingProductForm"
          @click="saveProduct"
        >
          {{ t('common.save') }}
        </v-btn-custom>
      </template>
    </DialogCard>

    <!-- ─── Dialog: proveedor ─────────────────────────────────────── -->
    <DialogCard
      v-model="state.dialogProvider"
      :title="providerDialogMeta.title"
      :icon="providerDialogMeta.icon"
      :loading="state.loadingProviderForm"
      :disabled="state.loadingProviderForm"
      width="800"
      actions
      @close="closeProviderDialog"
    >
      <v-form v-model="state.providerFormValid" @submit.prevent>
        <v-row>
          <!-- Datos generales -->
          <v-col cols="12">
            <FormCard :title="t('equipment.providers.form.generalData')">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="providerForm.name"
                    :label="t('equipment.providers.form.name')"
                    :color="providerDialogMeta.color"
                    :rules="providerRules.name"
                    prepend-inner-icon="mdi-handshake-outline"
                  />
                </v-col>
                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="providerForm.rfc"
                    :label="t('equipment.providers.form.rfc')"
                    :color="providerDialogMeta.color"
                    :rules="providerRules.rfc"
                    prepend-inner-icon="mdi-file-outline"
                  />
                </v-col>
                <v-col cols="12" md="6" lg="8">
                  <v-checkbox
                    v-model="providerForm.active"
                    :label="t('equipment.providers.form.active')"
                    :color="providerDialogMeta.color"
                    hide-details
                    single-line
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Información de contacto -->
          <v-col cols="12">
            <FormCard :title="t('equipment.providers.form.contactInfo')">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="providerForm.providerName"
                    :label="t('equipment.providers.form.contactName')"
                    :color="providerDialogMeta.color"
                    :rules="providerRules.providerName"
                    prepend-inner-icon="mdi-account-outline"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="providerForm.mobilePhone"
                    :label="t('equipment.providers.form.mobilePhone')"
                    :color="providerDialogMeta.color"
                    :rules="providerRules.mobilePhone"
                    prepend-inner-icon="mdi-phone-outline"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="providerForm.phoneOffice"
                    :label="t('equipment.providers.form.phoneOffice')"
                    :color="providerDialogMeta.color"
                    :rules="providerRules.phoneOffice"
                    prepend-inner-icon="mdi-deskphone"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="providerForm.phoneExt"
                    :label="t('equipment.providers.form.phoneExt')"
                    :color="providerDialogMeta.color"
                    prepend-inner-icon="mdi-card-account-phone-outline"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="providerForm.email"
                    :label="t('equipment.providers.form.email')"
                    :color="providerDialogMeta.color"
                    :rules="providerRules.email"
                    prepend-inner-icon="mdi-email-outline"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Dirección -->
          <v-col cols="12">
            <FormCard :title="t('equipment.providers.form.address')">
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="providerForm.country"
                    :label="t('equipment.providers.form.country')"
                    :color="providerDialogMeta.color"
                    prepend-inner-icon="mdi-earth"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="providerForm.state"
                    :label="t('equipment.providers.form.state')"
                    :color="providerDialogMeta.color"
                    prepend-inner-icon="mdi-town-hall"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="providerForm.zipCode"
                    :label="t('equipment.providers.form.zipCode')"
                    :color="providerDialogMeta.color"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="providerForm.city"
                    :label="t('equipment.providers.form.city')"
                    :color="providerDialogMeta.color"
                    prepend-inner-icon="mdi-city-variant-outline"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="providerForm.neighborhood"
                    :label="t('equipment.providers.form.neighborhood')"
                    :color="providerDialogMeta.color"
                    prepend-inner-icon="mdi-home-city-outline"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="providerForm.address"
                    :label="t('equipment.providers.form.addressLine')"
                    :color="providerDialogMeta.color"
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
          :color="providerDialogMeta.color"
          @click="closeProviderDialog"
        >
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          variant="flat"
          :color="providerDialogMeta.color"
          :loading="state.loadingProviderForm"
          @click="saveProvider"
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
  import { mockProducts, mockCategories, mockSummary } from '@/modules/equipment/MockData';
  import type {
    ProductResponse,
    ProductForm,
    ProductCreateRequest,
    ProductUpdateRequest,
    ProviderResponse,
    ProviderForm,
    ProviderCreateRequest,
    ProviderUpdateRequest,
    CategoryResponse,
    SummaryCard,
  } from '@/modules/equipment/types/EquipmentTypes';
  import TableCard from '@/shared/components/TableCard.vue';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import SummaryCardV3 from '@/shared/components/SummaryCardV3.vue';
  import type { I18nKeys } from '@/core/i18n/i18n-keys';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';

  const { t } = useTypedLocale();
  const { mobile } = useDisplay();
  const v = createValidators(t);

  // ─── Helpers de dominio ───────────────────────────────────────────────

  /**
   * Centraliza el color por estado del producto.
   * Reemplaza el plugin global $productStatusColor.
   */
  function productStatusColor(status: string): string {
    const map: Record<string, string> = {
      DISPONIBLE: 'success',
      OCUPADO: 'warning',
      SUSPENDIDO: 'error',
      MANTENIMIENTO: 'info',
    };
    return map[status.toUpperCase()] ?? 'default';
  }

  // Items de estado y tipo (traducción local, sin i18n para no sobrecomplicar
  // estos valores que vienen de la API como strings fijos)
  const productStatusItems = ['Disponible', 'Ocupado', 'Suspendido', 'Mantenimiento'];
  const productTypeItems = ['Venta', 'Renta', 'Ambos'];

  // ─── Estado: tabla ────────────────────────────────────────────────────

  const products = ref<ProductResponse[]>([]);
  const categories = ref<CategoryResponse[]>([]);
  const summary = ref<SummaryCard[]>([]);

  // ─── Estado: dialog producto ──────────────────────────────────────────
  const editedProductId = ref<string | null>(null);

  const defaultProductForm: ProductForm = {
    categoryId: '',
    barcode: '',
    name: '',
    shortDescription: '',
    longDescription: '',
    purchasePrice: 0,
    rentPrice: 0,
    maxStock: 0,
    minStock: 0,
    type: ['Venta'],
    active: true,
    providers: [],
  };
  const productForm = ref<ProductForm>({ ...defaultProductForm });

  // ─── Estado: dialog proveedor ─────────────────────────────────────────

  const state = reactive({
    // General
    search: '',
    filterCategory: null as string | null,
    filterStatus: null as string | null,
    loadingTable: false,
    // Equipo
    dialogProduct: false,
    productFormValid: false,
    loadingProductForm: false,
    // Proveedor
    dialogProvider: false,
    providerFormValid: false,
    loadingProviderForm: false,
    searchProvider: '',
  });

  const editedProviderId = ref<string | null>(null);

  const defaultProviderForm: ProviderForm = {
    name: '',
    rfc: '',
    active: true,
    providerName: '',
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
  const providerForm = ref<ProviderForm>({ ...defaultProviderForm });

  // ─── Estado: confirmación ─────────────────────────────────────────────

  const dialogConfirm = ref(false);
  const confirm = reactive({
    title: '',
    message: '',
    loading: false,
    onConfirm: () => {},
  });

  // ─── Headers ──────────────────────────────────────────────────────────

  const productHeaders = computed(() => [
    { key: 'code', title: t('equipment.headers.code') },
    { key: 'name', title: t('equipment.headers.name') },
    { key: 'category-name', title: t('equipment.headers.category'), value: 'categoryName' },
    { key: 'stock', title: t('equipment.headers.stock') },
    { key: 'status', title: t('equipment.headers.status') },
    {
      key: 'actions',
      title: t('equipment.headers.actions'),
      sortable: false,
      align: 'end' as const,
    },
  ]);

  const providerHeaders = computed(() => [
    { key: 'name', title: t('equipment.providers.headers.name') },
    {
      key: 'mobile-phone',
      title: t('equipment.providers.headers.mobilePhone'),
      value: 'mobilePhone',
    },
    { key: 'email', title: t('equipment.providers.headers.email') },
    { key: 'active', title: t('equipment.providers.headers.status') },
    {
      key: 'actions',
      title: t('equipment.providers.headers.actions'),
      sortable: false,
      align: 'end' as const,
    },
  ]);

  // ─── Meta de dialogs ──────────────────────────────────────────────────

  const productDialogMeta = computed(() => {
    const isNew = editedProductId.value === null;
    return {
      title: isNew ? t('equipment.dialog.titleNew') : t('equipment.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const providerDialogMeta = computed(() => {
    const isNew = editedProviderId.value === null;
    return {
      title: isNew ? t('equipment.providers.titleNew') : t('equipment.providers.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  // ─── Reglas de validación ─────────────────────────────────────────────

  const productRules = computed(() => ({
    name: [v.required(), v.maxLength(30, t('equipment.form.name'))],
    shortDescription: [v.required(), v.maxLength(60, t('equipment.form.shortDescription'))],
    longDescription: [v.required(), v.maxLength(1200, t('equipment.form.longDescription'))],
    barcode: [
      v.required(),
      v.maxLength(10, t('equipment.form.barcode')),
      v.onlyNumbers(t('equipment.form.barcode')),
    ],
    categoryId: [v.required()],
    purchasePrice: [v.required()],
    rentPrice: [v.required()],
    maxStock: [v.required()],
    minStock: [v.required()],
    type: [v.required(), v.requiredLength()],
  }));

  const providerRules = computed(() => ({
    name: [v.required(), v.maxLength(120, t('equipment.providers.form.name'))],
    rfc: [v.required(), v.maxLength(13, t('equipment.providers.form.rfc'))],
    providerName: [v.required(), v.maxLength(60, t('equipment.providers.form.contactName'))],
    mobilePhone: [
      v.required(),
      v.maxLength(15, t('equipment.providers.form.mobilePhone')),
      v.onlyNumbers(t('equipment.providers.form.mobilePhone')),
    ],
    phoneOffice: [
      v.maxLength(15, t('equipment.providers.form.phoneOffice')),
      v.onlyNumbers(t('equipment.providers.form.phoneOffice')),
    ],
    email: [
      v.required(),
      v.maxLength(60, t('equipment.providers.form.email')),
      v.onlyEmail(t('equipment.providers.form.email')),
    ],
  }));

  // ─── Mapeo entre capas ────────────────────────────────────────────────

  function toProductForm(r: ProductResponse): Partial<ProductForm> {
    return {
      categoryId: r.categoryId,
      barcode: r.code,
      name: r.name,
      shortDescription: r.description,
      longDescription: '',
      purchasePrice: 0,
      rentPrice: 0,
      maxStock: r.stock,
      minStock: 0,
      type: ['Venta'],
      active: true,
      providers: [],
    };
  }

  function toProductCreateRequest(form: ProductForm): ProductCreateRequest {
    const { providers: _, ...rest } = form;
    return rest;
  }

  function toProductUpdateRequest(form: ProductForm, id: string): ProductUpdateRequest {
    return { id, ...toProductCreateRequest(form) };
  }

  function toProviderCreateRequest(form: ProviderForm, idProduct: string): ProviderCreateRequest {
    return { idProduct, ...form };
  }

  function toProviderUpdateRequest(
    form: ProviderForm,
    id: string,
    idProduct: string
  ): ProviderUpdateRequest {
    return { id, ...toProviderCreateRequest(form, idProduct) };
  }

  // ─── CRUD: productos ──────────────────────────────────────────────────

  function openProductDialog(item?: ProductResponse): void {
    if (item) {
      setTimeout(() => {
        editedProductId.value = item.id;
        productForm.value = { ...defaultProductForm, ...toProductForm(item) };

        state.dialogProduct = true;
      }, 300);
    } else {
      state.dialogProduct = true;
    }
  }

  function closeProductDialog(): void {
    state.dialogProduct = false;
    nextTick(() => {
      productForm.value = { ...defaultProductForm };
      editedProductId.value = null;
    });
  }

  async function saveProduct(): Promise<void> {
    state.loadingProductForm = true;
    try {
      if (editedProductId.value === null) {
        const request: ProductCreateRequest = toProductCreateRequest(productForm.value);
        // const response = await productService.create(request)
        // products.value.push(response)
        const cat = categories.value.find(c => c.id === request.categoryId);
        products.value.push({
          id: crypto.randomUUID(),
          code: request.barcode,
          name: request.name,
          description: request.shortDescription,
          categoryId: request.categoryId,
          categoryName: cat?.name ?? '',
          stock: request.maxStock,
          status: 'Disponible',
        });
      } else {
        const request: ProductUpdateRequest = toProductUpdateRequest(
          productForm.value,
          editedProductId.value
        );
        // await productService.update(request)
        const idx = products.value.findIndex(p => p.id === request.id);
        if (idx !== -1) {
          const cat = categories.value.find(c => c.id === request.categoryId);
          products.value[idx] = {
            ...products.value[idx],
            name: request.name,
            description: request.shortDescription,
            categoryId: request.categoryId,
            categoryName: cat?.name ?? '',
            stock: request.maxStock,
          };
        }
      }
      closeProductDialog();
    } finally {
      state.loadingProductForm = false;
    }
  }

  function confirmDeleteProduct(item: ProductResponse): void {
    confirm.title = t('equipment.dialog.deleteTitle', { name: item.name });
    confirm.message = t('equipment.dialog.deleteMessage');
    confirm.onConfirm = async () => {
      confirm.loading = true;
      try {
        // await productService.delete(item.id)
        products.value = products.value.filter(p => p.id !== item.id);
        dialogConfirm.value = false;
      } finally {
        confirm.loading = false;
      }
    };
    dialogConfirm.value = true;
  }

  // ─── CRUD: proveedores ────────────────────────────────────────────────

  function openProviderDialog(item?: ProviderResponse): void {
    if (item) {
      setTimeout(() => {
        editedProviderId.value = item.id;
        const { id: _, idProduct: __, ...rest } = item;
        providerForm.value = { ...rest };
        state.dialogProvider = true;
      }, 300);
    } else {
      state.dialogProvider = true;
    }
  }

  function closeProviderDialog(): void {
    state.dialogProvider = false;
    nextTick(() => {
      providerForm.value = { ...defaultProviderForm };
      editedProviderId.value = null;
    });
  }

  async function saveProvider(): Promise<void> {
    const idProduct = editedProductId.value ?? '';
    state.loadingProviderForm = true;
    try {
      if (editedProviderId.value === null) {
        const request: ProviderCreateRequest = toProviderCreateRequest(
          providerForm.value,
          idProduct
        );
        // const response = await providerService.create(request)
        // productForm.value.providers.push(response)
        productForm.value.providers.push({ id: crypto.randomUUID(), ...request });
      } else {
        const request: ProviderUpdateRequest = toProviderUpdateRequest(
          providerForm.value,
          editedProviderId.value,
          idProduct
        );
        // await providerService.update(request)
        const idx = productForm.value.providers.findIndex(p => p.id === request.id);
        if (idx !== -1) productForm.value.providers[idx] = { ...request };
      }
      closeProviderDialog();
    } finally {
      state.loadingProviderForm = false;
    }
  }

  // ─── Otros handlers ───────────────────────────────────────────────────

  function onScanBarcode(): void {
    // TODO: abrir ScannerPicker y recibir el código escaneado
  }

  // ─── Inicialización ───────────────────────────────────────────────────

  onMounted(() => {
    // TODO: reemplazar con llamadas reales al service
    // products.value   = await productService.getAll()
    // categories.value = await categoryService.getAll()
    // summary.value    = await productService.getSummary()
    products.value = mockProducts;
    categories.value = mockCategories;
    summary.value = mockSummary;
  });
</script>
