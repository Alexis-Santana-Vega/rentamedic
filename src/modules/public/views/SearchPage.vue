<template>
  <div>
    <section class="py-16 bg-surface">
      <v-container>
        <div class="text-display-medium font-weight-black text-center text-medium-emphasis">
          Buscar Equipo
        </div>
      </v-container>
    </section>
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <v-row>
            <v-col cols="12">
              <TableCard icon="mdi-magnify" title="Buscar">
                <v-form @submit.prevent="initialize">
                  <v-text-field
                    label="Buscar por Nombre"
                    hide-details
                    single-line
                    clearable
                  ></v-text-field>
                </v-form>
              </TableCard>
            </v-col>
            <v-col cols="12">
              <TableCard icon="mdi-filter-variant" title="Filtros">
                <template #append>
                  <v-btn color="tertiary" variant="tonal" icon="mdi-sync" size="small"></v-btn>
                </template>
                <v-row density="compact">
                  <v-col cols="12">
                    <v-select
                      v-model="filter.ofert"
                      label="Oferta de Producto"
                      :items="['Renta', 'Venta']"
                      chips
                      multiple
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="filter.categories"
                      label="Categorías"
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
                    <v-text-field v-model="filter.price[0]" label="Precio Mínimo"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="filter.price[1]" label="Precio Máximo"></v-text-field>
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
            Resultados de la búsqueda
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
                      <div class="text-caption font-weight-medium text-medium-emphasis">
                        {{ item.raw.brand }}
                      </div>
                      <div class="text-body-2 font-weight-bold">{{ item.raw.name }}</div>
                      <div class="mt-2 d-flex flex-column ga-2">
                        <div v-if="item.raw.rentPrice">
                          <v-chip color="success" density="comfortable">Renta</v-chip>
                          <span class="ml-2 font-weight-medium">{{ item.raw.rentPrice }}</span>
                        </div>
                        <div v-if="item.raw.sellingPrice">
                          <v-chip color="tertiary" density="comfortable">Venta</v-chip>
                          <span class="ml-2 font-weight-medium">{{ item.raw.sellingPrice }}</span>
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
        title="Detalles"
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
                    height="100"
                    width="100"
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
          >
            <div class="text-body-medium font-weight-bold text-medium-emphasis">
              {{ editedProduct.shortDescription }}
            </div>
            <v-tabs v-model="controls.tab" grow>
              <v-tab value="RENTA">Renta</v-tab>
              <v-tab value="VENTA">Venta</v-tab>
            </v-tabs>
            <v-tabs-window v-model="controls.tab" class="pt-6">
              <v-tabs-window-item value="RENTA">
                <div class="d-flex align-center justify-center">
                  <div style="width: 400px">
                    <v-form @submit.prevent="handleBuyOption">
                      <v-row density="compact">
                        <v-col cols="12">
                          <v-text-field
                            label="Cantidad de horas"
                            prepend-icon="mdi-minus"
                            append-icon="mdi-plus"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Tiempo de Renta (horas)"
                            prepend-icon="mdi-minus"
                            append-icon="mdi-plus"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-btn-custom prepend-icon="mdi-cart-arrow-down" block type="submit"
                            >Rentar Equipo</v-btn-custom
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
                    <v-form @submit.prevent="handleRentOption">
                      <v-row density="compact">
                        <v-col cols="12">
                          <v-text-field
                            label="Cantidad"
                            prepend-icon="mdi-minus"
                            append-icon="mdi-plus"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-btn-custom
                            prepend-icon="mdi-cart-arrow-down"
                            color="tertiary"
                            block
                            type="submit"
                            >Comprar Equipo</v-btn-custom
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
              Descripción
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
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import TableCard from '@/shared/components/TableCard.vue';
  import ImagePreview from '@/shared/components/ImagePreview.vue';
  import ImageZoomDialog from '@/shared/components/ImageZoomDialog.vue';
  import type { SearchLightResponse, SearchResponse } from '../types/publicTypes';
  import { mockSearch } from '../MockData';
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
  });
  const filter = reactive({
    ofert: [],
    categories: [],
    price: [0, 0],
  });

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  const defaultProduct: SearchResponse = {
    id: '',
    brand: '',
    name: '',
    longDescription: '',
    photoUrl: [],
    rentPrice: '',
    sellingPrice: '',
    shortDescription: '',
    status: [],
  };

  const editedProduct = ref<SearchResponse>({ ...defaultProduct });

  /** Methods */
  const mapSearchToLight = (search: SearchResponse): SearchLightResponse => {
    return {
      id: search.id,
      name: search.name,
      brand: search.brand,
      photoUrl: search.photoUrl,
      rentPrice: search.rentPrice,
      sellingPrice: search.sellingPrice,
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
      emit('loadingChange', false);
      controls.dialogProduct = true;
    }, 1000);
  };

  const closeDialogProduct = () => {
    controls.dialogProduct = false;
    nextTick(() => {
      editedProduct.value = Object.assign({}, defaultProduct);
      controls.selectedIndex = 0;
    });
  };

  function handleOpenPreview(globalIndex: number) {
    controls.selectedIndex = globalIndex;
    controls.dialogActive = true;
  }

  function handleRentOption() {}

  function handleBuyOption() {}

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
