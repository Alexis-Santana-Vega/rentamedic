<template>
  <div>
    <section class="py-16 bg-surface">
      <v-container>
        <div class="text-display-medium font-weight-black text-center text-medium-emphasis">
          {{ t('public.search.pageTitle') }}
        </div>
      </v-container>
    </section>
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <v-row>
            <v-col cols="12">
              <TableCard icon="mdi-magnify" :title="t('public.search.searchCard')">
                <v-form @submit.prevent="initialize">
                  <v-text-field
                    :label="t('public.search.searchByName')"
                    hide-details
                    single-line
                    clearable
                  ></v-text-field>
                </v-form>
              </TableCard>
            </v-col>
            <v-col cols="12">
              <TableCard icon="mdi-filter-variant" :title="t('public.search.filtersCard')">
                <template #append>
                  <v-btn color="tertiary" variant="tonal" icon="mdi-sync" size="small"></v-btn>
                </template>
                <v-row density="compact">
                  <v-col cols="12">
                    <v-select
                      v-model="filter.ofert"
                      :label="t('public.search.offerLabel')"
                      :items="[t('public.search.offerRent'), t('public.search.offerSale')]"
                      chips
                      multiple
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="filter.categories"
                      :label="t('public.search.categoriesLabel')"
                      :items="[
                        'Neonatal',
                        'Respiratorio',
                        'Laboratorio',
                        'Ortopédico',
                        'Terapéutico',
                        'Imagenología',
                      ]"
                      multiple
                      chips
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="filter.price[0]"
                      :label="t('public.search.priceMin')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="filter.price[1]"
                      :label="t('public.search.priceMax')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-range-slider
                      v-model="filter.price"
                      hide-details
                      color="primary"
                      strict
                      :min="100"
                      max="100000"
                      step="100"
                    >
                    </v-range-slider>
                  </v-col>
                </v-row>
              </TableCard>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="9" xl="9">
          <div class="text-medium-emphasis font-weight-black text-title-large text-center">
            {{ t('public.search.resultsTitle') }}
          </div>
          <v-divider class="mt-2 mb-4"></v-divider>
          <v-data-iterator
            :items="products"
            :items-per-page="6"
            :loading="controls.loadingIterator"
          >
            <template #loader>
              <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="6" lg="6" xl="4">
                  <v-skeleton-loader type="image, heading, chip, text"></v-skeleton-loader>
                </v-col>
              </v-row>
            </template>
            <template #default="{ items }">
              <v-row>
                <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" md="6" lg="6" xl="4">
                  <v-card height="100%" class="pointer-hover">
                    <v-carousel
                      hide-delimiters
                      show-arrows="hover"
                      :height="smAndDown ? 150 : 200"
                      @click.stop
                    >
                      <v-carousel-item
                        v-for="(img, im) in item.raw.photoUrl"
                        :key="im"
                        :src="img"
                      ></v-carousel-item>
                    </v-carousel>
                    <v-card-text
                      :class="`mouse-enter-point ${!smAndDown || 'pa-2'}`"
                      @click="openDialogProduct(item.raw)"
                    >
                      <div class="text-label-medium font-weight-medium text-medium-emphasis">
                        {{ item.raw.brand }}
                      </div>
                      <div class="text-body-large font-weight-bold">{{ item.raw.name }}</div>
                      <div class="mt-2 d-flex flex-column ga-2">
                        <div v-if="item.raw.rentalPrice">
                          <v-chip color="secondary" density="comfortable">{{
                            t('public.search.chipRent')
                          }}</v-chip>
                          <span class="ml-2 font-weight-medium">{{
                            formatCurrency(item.raw.rentalPrice)
                          }}</span>
                        </div>
                        <div v-if="item.raw.salePrice">
                          <v-chip color="tertiary" density="comfortable">{{
                            t('public.search.chipSale')
                          }}</v-chip>
                          <span class="ml-2 font-weight-medium">{{
                            formatCurrency(item.raw.salePrice)
                          }}</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <template #footer="{ page, pageCount, setPage, setItemsPerPage, itemsPerPage }">
              <v-row class="bg-surface mt-4 px-2 pt-2 pb-1 rounded-lg">
                <v-col cols="2" sm="2" md="1" lg="1" xl="1">
                  <v-menu>
                    <template #activator="{ props, isActive }">
                      <v-btn
                        variant="flat"
                        color="primary"
                        :append-icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        v-bind="props"
                        class="my-1"
                        >{{ itemsPerPage }}</v-btn
                      >
                    </template>
                    <v-sheet class="text-center" elevation="8">
                      <v-list density="compact" class="pa-1">
                        <v-list-item
                          v-for="(item, index) in [3, 6, 9, 12]"
                          :key="index"
                          @click="setItemsPerPage(item)"
                        >
                          <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-menu>
                </v-col>
                <v-col cols="10" sm="10" md="11" lg="11" xl="11">
                  <v-pagination
                    :model-value="page"
                    color="primary"
                    :length="pageCount"
                    :total-visible="3"
                    @update:model-value="setPage"
                  ></v-pagination>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
      <DialogCard
        v-model="controls.dialogProduct"
        width="1000"
        :title="t('public.search.dialog.title')"
        icon="mdi-hospital-box-outline"
        @close="closeDialogProduct()"
      >
        <div class="d-flex ga-2 flex-column flex-md-row">
          <div>
            <ImageZoomDialog
              v-model="controls.dialogActive"
              :images="editedProduct.photoUrl"
              :initial-index="controls.selectedIndex"
            />
            <v-slide-group
              v-model="controls.slide"
              show-arrows
              mandatory
              :direction="smAndDown ? 'horizontal' : 'vertical'"
            >
              <v-slide-group-item v-for="(img, im) in editedProduct.photoUrl" :key="im">
                <div class="mb-4 mr-2">
                  <ImagePreview
                    :height="smAndDown ? '100' : '150'"
                    :width="smAndDown ? '100' : '150'"
                    :src="img"
                    @open-preview="handleOpenPreview(im)"
                  />
                </div>
              </v-slide-group-item>
            </v-slide-group>
          </div>
          <TableCard
            icon="mdi-tag-outline"
            :title="editedProduct.name"
            :subtitle="editedProduct.brand"
            class="w-100"
          >
            <div class="text-body-medium font-weight-bold text-medium-emphasis">
              {{ editedProduct.shortDescription }}
            </div>
            <v-tabs v-model="controls.tab" grow>
              <v-tab v-if="rentOption" value="RENTA">{{ t('public.search.dialog.tabRent') }}</v-tab>
              <v-tab v-if="saleOption" value="VENTA">{{ t('public.search.dialog.tabSale') }}</v-tab>
            </v-tabs>
            <v-tabs-window v-model="controls.tab" class="pt-6">
              <v-tabs-window-item value="RENTA">
                <div class="d-flex align-center justify-center">
                  <div style="width: 400px">
                    <v-form v-model="controls.rentFormValid" @submit.prevent="handleRentOption">
                      <v-row density="compact">
                        <v-col
                          cols="12"
                          class="text-title-large text-medium-emphasis font-weight-black mb-4"
                        >
                          {{ t('public.search.dialog.costPerDay') }}
                          {{ formatCurrency(editedProduct.rentalPrice) }}
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedRentForm.quantity"
                            :label="t('public.search.dialog.quantity')"
                            prepend-icon="mdi-minus"
                            append-icon="mdi-plus"
                            :rules="baseFormRules.quantity"
                            @click:prepend="editedRentForm.quantity--"
                            @click:append="editedRentForm.quantity++"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedRentForm.rentalDays"
                            :label="t('public.search.dialog.rentalDays')"
                            prepend-icon="mdi-minus"
                            append-icon="mdi-plus"
                            prepend-inner-icon="mdi-calendar-outline"
                            :rules="baseFormRules.rentalDays"
                            @click:prepend="editedRentForm.rentalDays--"
                            @click:append="editedRentForm.rentalDays++"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-2">
                          <v-btn-custom
                            prepend-icon="mdi-cart-arrow-down"
                            variant="outlined"
                            block
                            type="submit"
                            :disabled="!controls.rentFormValid"
                            >{{ t('public.search.dialog.addToCart') }}</v-btn-custom
                          >
                        </v-col>
                        <v-col cols="12">
                          <v-btn-custom
                            prepend-icon="mdi-cart-variant"
                            block
                            :disabled="!controls.rentFormValid"
                            >{{ t('public.search.dialog.rentNow') }}</v-btn-custom
                          >
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </div>
              </v-tabs-window-item>
              <v-tabs-window-item value="VENTA">
                <div class="d-flex align-center justify-center">
                  <div style="width: 400px">
                    <v-form v-model="controls.saleFormValid" @submit.prevent="handleBuyOption">
                      <v-row density="compact">
                        <v-col
                          cols="12"
                          class="text-title-large text-medium-emphasis font-weight-black mb-4"
                        >
                          {{ t('public.search.dialog.salePrice') }}
                          {{ formatCurrency(editedProduct.salePrice) }}
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedSaleForm.quantity"
                            :label="t('public.search.dialog.quantity')"
                            prepend-icon="mdi-minus"
                            append-icon="mdi-plus"
                            :rules="baseFormRules.quantity"
                            @click:prepend="editedSaleForm.quantity--"
                            @click:append="editedSaleForm.quantity++"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-2">
                          <v-btn-custom
                            prepend-icon="mdi-cart-arrow-down"
                            variant="outlined"
                            block
                            color="tertiary"
                            type="submit"
                            :disabled="!controls.saleFormValid"
                            >{{ t('public.search.dialog.addToCart') }}</v-btn-custom
                          >
                        </v-col>
                        <v-col cols="12">
                          <v-btn-custom
                            prepend-icon="mdi-cart-variant"
                            block
                            color="tertiary"
                            :disabled="!controls.saleFormValid"
                            >{{ t('public.search.dialog.buyNow') }}</v-btn-custom
                          >
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
            <v-divider class="mt-4"></v-divider>
            <div class="text-title-large font-weight-black my-2 text-medium-emphasis">
              {{ t('public.search.dialog.description') }}
            </div>
            <div class="text-justify">
              {{ editedProduct.longDescription }}
            </div>
          </TableCard>
        </div>
      </DialogCard>
    </v-container>
  </div>
</template>
<script setup lang="ts">
  import { computed, nextTick, onMounted, reactive, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import TableCard from '@/shared/components/TableCard.vue';
  import ImagePreview from '@/shared/components/ImagePreview.vue';
  import ImageZoomDialog from '@/shared/components/ImageZoomDialog.vue';
  import type {
    RentForm,
    SaleForm,
    SearchLightResponse,
    SearchResponse,
  } from '../types/publicTypes';
  import type { CartItem } from '@/shared/types/CartTypes';
  import { mockSearch } from '../MockData';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import { formatCurrency } from '@/shared/utils/formatters';
  import { useSwal } from '@/shared/composables/useSwal';
  const { smAndDown } = useDisplay();
  const products = ref<SearchLightResponse[]>([]);
  const controls = reactive({
    loadingIterator: false,
    dialogProduct: false,
    loadingOverlay: false,
    slide: null,
    tab: 'RENTA',
    dialogActive: false,
    selectedIndex: 0,
    rentFormValid: false,
    saleFormValid: false,
  });
  const filter = reactive({
    ofert: [],
    categories: [],
    price: [0, 0],
  });
  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  const { t } = useTypedLocale();
  const v = createValidators(t);
  const { toast } = useSwal();

  const defaultProduct: SearchResponse = {
    id: '',
    brand: '',
    name: '',
    longDescription: '',
    photoUrl: [],
    rentalPrice: 0,
    salePrice: 0,
    shortDescription: '',
    status: [],
  };

  const editedProduct = ref<SearchResponse>({ ...defaultProduct });

  const defaultRentForm: RentForm = {
    productId: '',
    quantity: 1,
    rentalDays: 1,
  };

  const editedRentForm = ref<RentForm>({ ...defaultRentForm });

  const defaultSaleForm: SaleForm = {
    productId: '',
    quantity: 1,
  };

  const editedSaleForm = ref<SaleForm>({ ...defaultSaleForm });

  const baseFormRules = computed(() => ({
    rentalDays: [
      v.required(),
      v.minNumber(1, t('public.search.dialog.rentalDays')),
      v.maxNumber(90, t('public.search.dialog.rentalDays')),
    ],
    quantity: [
      v.required(),
      v.minNumber(1, t('public.search.dialog.quantity')),
      v.maxNumber(10, t('public.search.dialog.quantity')),
    ],
  }));

  const rentOption = computed(() => editedProduct.value.status.includes('RENTA'));
  const saleOption = computed(() => editedProduct.value.status.includes('VENTA'));

  /** Methods */
  const mapSearchToLight = (search: SearchResponse): SearchLightResponse => {
    return {
      id: search.id,
      name: search.name,
      brand: search.brand,
      photoUrl: search.photoUrl,
      rentalPrice: search.rentalPrice,
      salePrice: search.salePrice,
      status: search.status,
    };
  };
  const initialize = () => {
    controls.loadingIterator = true;
    setTimeout(() => {
      products.value = mockSearch.map(mapSearchToLight);
      controls.loadingIterator = false;
    }, 1000);
  };
  const openDialogProduct = (item: SearchLightResponse) => {
    emit('loadingChange', true);
    setTimeout(() => {
      editedProduct.value = { ...mockSearch.find(i => i.id === item.id)! };
      if (rentOption.value) controls.tab = 'RENTA';
      else controls.tab = 'VENTA';
      emit('loadingChange', false);
      controls.dialogProduct = true;
    }, 1000);
  };
  const closeDialogProduct = () => {
    controls.dialogProduct = false;
    nextTick(() => {
      editedProduct.value = Object.assign({}, defaultProduct);
      editedRentForm.value = Object.assign({}, defaultRentForm);
      editedSaleForm.value = Object.assign({}, defaultSaleForm);
      controls.selectedIndex = 0;
    });
  };

  function handleOpenPreview(globalIndex: number) {
    controls.selectedIndex = globalIndex;
    controls.dialogActive = true;
  }

  function handleRentOption() {
    const cartItem: CartItem = {
      id: crypto.randomUUID(),
      productId: editedProduct.value.id,
      productName: editedProduct.value.name,
      type: 'RENTA',
      quantity: editedRentForm.value.quantity,
      rentalPrice: editedProduct.value.rentalPrice,
      rentalDays: editedRentForm.value.rentalDays,
      photoUrl: editedProduct.value.photoUrl[0],
    };
    const storedCart = localStorage.getItem('rentaMedicCartItems');
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    const existingItemIndex = cart.findIndex(
      item => item.productId === cartItem.productId && item.type === cartItem.type
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += cartItem.quantity;
      cart[existingItemIndex].rentalDays! += cartItem.rentalDays!;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem('rentaMedicCartItems', JSON.stringify(cart));
    toast('success', t('public.search.notifications.addedToCart', { name: cartItem.productName }));
    closeDialogProduct();
  }

  function handleBuyOption() {
    const cartItem: CartItem = {
      id: crypto.randomUUID(),
      productId: editedProduct.value.id,
      productName: editedProduct.value.name,
      type: 'VENTA',
      quantity: editedSaleForm.value.quantity,
      salePrice: editedProduct.value.salePrice,
      photoUrl: editedProduct.value.photoUrl[0],
    };
    const storedCart = localStorage.getItem('rentaMedicCartItems');
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    const existingItemIndex = cart.findIndex(
      item => item.productId === cartItem.productId && item.type === cartItem.type
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem('rentaMedicCartItems', JSON.stringify(cart));
    toast('success', t('public.search.notifications.addedToCart', { name: cartItem.productName }));
    closeDialogProduct();
  }

  onMounted(initialize);
</script>
<style scoped>
  .mouse-enter-point {
    cursor: pointer;
  }

  .pointer-hover {
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: rgba(var(--v-theme-surface-variant), 0) 0px 0px 0px;
  }
  .pointer-hover:hover {
    box-shadow: rgba(var(--v-theme-surface-variant), 0.1) 0px 4px 10px !important;
  }
</style>
