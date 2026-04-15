<template>
  <v-container fluid>
    <card-table
      icon="mdi-tag-outline"
      :title="t('categories.page.title')"
      :subtitle="t('categories.page.subtitle')"
    >
      <v-row dense>
        <v-col cols="12" md="6" lg="8" xl="9">
          <iterator-header>
            <btn-custom prepend-icon="mdi-plus" @click="openCategoryDialog()">
              {{ t('categories.actions.add') }}
            </btn-custom>
          </iterator-header>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <iterator-header>
            <v-text-field
              v-model="categorySearch"
              :placeholder="t('categories.search')"
              single-line
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
            />
          </iterator-header>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :items="categories"
            :headers="categoryHeaders"
            :search="categorySearch"
            :loading="loadingCategories"
          >
            <template #item.name="{ value }">
              <span class="font-weight-medium">{{ value }}</span>
            </template>
            <template #item.description="{ value }">
              <span class="text-caption">{{ value }}</span>
            </template>
            <template #item.actions="{ item }">
              <btn-tooltip
                icon="mdi-delete-outline"
                :text="t('categories.actions.delete')"
                color="error"
                @click="confirmDeleteCategory(item)"
              />
              <btn-tooltip
                icon="mdi-circle-edit-outline"
                :text="t('categories.actions.edit')"
                color="secondary"
                @click="openCategoryDialog(item)"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </card-table>

    <!-- ─── Dialog: categoría ─────────────────────────────────────── -->
    <v-dialog v-model="dialogCategory" persistent scrollable width="1000">
      <card-dialog
        :title="categoryDialogMeta.title"
        :icon="categoryDialogMeta.icon"
        :loading="loadingCategoryDialog"
        actions
        @close="closeCategoryDialog"
      >
        <v-row>
          <!-- Información general -->
          <v-col cols="12">
            <card-form :title="t('categories.form.generalInfo')">
              <v-form ref="categoryFormRef" v-model="categoryFormValid">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedCategory.name"
                      :label="t('categories.form.name')"
                      :color="categoryDialogMeta.color"
                      :rules="categoryRules.name"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editedCategory.description"
                      :label="t('categories.form.description')"
                      :color="categoryDialogMeta.color"
                      :rules="categoryRules.description"
                      rows="3"
                      auto-grow
                    />
                  </v-col>
                  <v-col cols="12" class="text-caption text-disabled">
                    {{ t('common.requiredFields') }}
                  </v-col>
                </v-row>
              </v-form>
            </card-form>
          </v-col>

          <!-- Características -->
          <v-col cols="12">
            <card-form :title="t('categories.features.title')" icon="mdi-tag-multiple-outline">
              <v-data-table
                :items="editedCategory.features"
                :headers="featureHeaders"
                :search="featureSearch"
              >
                <template #top>
                  <v-row dense>
                    <v-col cols="12" md="7">
                      <iterator-header>
                        <btn-custom
                          prepend-icon="mdi-plus"
                          :block="mobile"
                          @click="openFeatureDialog()"
                        >
                          {{ t('categories.features.add') }}
                        </btn-custom>
                      </iterator-header>
                    </v-col>
                    <v-col cols="12" md="5">
                      <iterator-header>
                        <v-text-field
                          v-model="featureSearch"
                          :placeholder="t('categories.features.search')"
                          single-line
                          hide-details
                          clearable
                          prepend-inner-icon="mdi-magnify"
                        />
                      </iterator-header>
                    </v-col>
                  </v-row>
                </template>

                <template #item.measure="{ item }">
                  <v-chip
                    v-if="item.measure"
                    :prepend-icon="item.icon ?? undefined"
                    :color="item.color ?? undefined"
                  >
                    <v-tooltip
                      activator="parent"
                      location="end"
                      :text="item.abbr ?? ''"
                      :content-class="`bg-${item.color} font-weight-medium`"
                    />
                    {{ item.measure }}
                  </v-chip>
                  <span v-else class="text-disabled">—</span>
                </template>

                <template #item.actions="{ item }">
                  <btn-tooltip
                    icon="mdi-delete-outline"
                    :text="t('categories.features.delete')"
                    color="error"
                    @click="confirmDeleteFeature(item)"
                  />
                  <btn-tooltip
                    icon="mdi-circle-edit-outline"
                    :text="t('categories.features.edit')"
                    color="secondary"
                    @click="openFeatureDialog(item)"
                  />
                </template>
              </v-data-table>
            </card-form>
          </v-col>
        </v-row>

        <template #actions>
          <v-spacer />
          <btn-custom
            variant="tonal"
            :color="categoryDialogMeta.color"
            @click="closeCategoryDialog"
          >
            {{ t('common.cancel') }}
          </btn-custom>
          <btn-custom
            variant="elevated"
            :color="categoryDialogMeta.color"
            :loading="loadingCategoryDialog"
            @click="saveCategory"
          >
            {{ t('common.save') }}
          </btn-custom>
        </template>
      </card-dialog>
    </v-dialog>

    <!-- ─── Dialog: característica (anidado) ─────────────────────── -->
    <v-dialog v-model="dialogFeature" persistent scrollable width="500">
      <card-dialog
        :title="featureDialogMeta.title"
        :icon="featureDialogMeta.icon"
        :loading="loadingFeatureDialog"
        actions
        @close="closeFeatureDialog"
      >
        <card-form>
          <v-form ref="featureFormRef" v-model="featureFormValid">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="editedFeature.name"
                  :label="t('categories.features.form.name')"
                  :color="featureDialogMeta.color"
                  :rules="featureRules.name"
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedFeature.idMeasure"
                  :label="t('categories.features.form.measure')"
                  :color="featureDialogMeta.color"
                  :items="measureItems"
                  item-value="id"
                  item-title="name"
                  :rules="featureRules.measure"
                  chips
                >
                  <template #chip="{ props, item }">
                    <v-chip
                      v-bind="props"
                      :color="item.raw.color ?? undefined"
                      :prepend-icon="item.raw.icon ?? undefined"
                      :text="item.raw.name"
                    />
                  </template>
                  <template #item="{ props, item }">
                    <v-list-item v-bind="props" :title="item.raw.name">
                      <template #prepend>
                        <v-avatar
                          v-if="item.raw.id"
                          variant="tonal"
                          :icon="item.raw.icon ?? undefined"
                          :color="item.raw.color ?? undefined"
                        />
                        <v-avatar v-else variant="tonal" class="font-weight-bold"> N/A </v-avatar>
                      </template>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" class="text-caption text-disabled">
                {{ t('common.requiredFields') }}
              </v-col>
            </v-row>
          </v-form>
        </card-form>

        <template #actions>
          <v-spacer />
          <btn-custom variant="tonal" :color="featureDialogMeta.color" @click="closeFeatureDialog">
            {{ t('common.cancel') }}
          </btn-custom>
          <btn-custom
            variant="elevated"
            :color="featureDialogMeta.color"
            :loading="loadingFeatureDialog"
            @click="saveFeature"
          >
            {{ t('common.save') }}
          </btn-custom>
        </template>
      </card-dialog>
    </v-dialog>

    <!-- ─── Dialog: confirmación ──────────────────────────────────── -->
    <v-dialog v-model="dialogConfirm" max-width="420" persistent>
      <v-card :title="confirm.title" :prepend-icon="confirm.icon">
        <v-card-text>{{ confirm.message }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <btn-custom variant="tonal" @click="dialogConfirm = false">
            {{ t('common.cancel') }}
          </btn-custom>
          <btn-custom
            variant="elevated"
            color="error"
            :loading="confirm.loading"
            @click="confirm.onConfirm"
          >
            {{ t('common.delete') }}
          </btn-custom>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, nextTick, onMounted } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';

  const { t } = useTypedLocale();
  const { mobile } = useDisplay();
  const v = createValidators(t);

  // ─── Tipos ────────────────────────────────────────────────────────────

  interface MeasureItem {
    id: string | null;
    name: string;
    abbr: string | null;
    color: string | null;
    icon: string | null;
  }

  interface Feature {
    id: string;
    idCategory?: string;
    idMeasure: string | null;
    name: string;
    measure: string | null;
    abbr: string | null;
    icon: string | null;
    color: string | null;
  }

  interface Category {
    id: string;
    name: string;
    description: string;
    features: Feature[];
  }

  // ─── Estado: categorías ───────────────────────────────────────────────

  const categories = ref<Category[]>([]);
  const categorySearch = ref('');
  const categoryFormRef = ref();
  const categoryFormValid = ref(false);
  const dialogCategory = ref(false);
  const loadingCategories = ref(false);
  const loadingCategoryDialog = ref(false);
  const editedCategoryIndex = ref(-1);

  const defaultCategory: Category = {
    id: '',
    name: '',
    description: '',
    features: [],
  };
  const editedCategory = ref<Category>({ ...defaultCategory });

  // ─── Estado: características ──────────────────────────────────────────

  const measureItems = ref<MeasureItem[]>([]);
  const featureSearch = ref('');
  const featureFormRef = ref();
  const featureFormValid = ref(false);
  const dialogFeature = ref(false);
  const loadingFeatureDialog = ref(false);
  const editedFeatureIndex = ref(-1);

  const defaultFeature: Feature = {
    id: '',
    idMeasure: null,
    name: '',
    measure: null,
    abbr: null,
    icon: null,
    color: null,
  };
  const editedFeature = ref<Feature>({ ...defaultFeature });

  // ─── Estado: confirmación ─────────────────────────────────────────────

  const dialogConfirm = ref(false);
  const confirm = reactive({
    title: '',
    message: '',
    icon: 'mdi-alert-outline',
    loading: false,
    onConfirm: () => {},
  });

  // ─── Headers ──────────────────────────────────────────────────────────

  const categoryHeaders = computed(() => [
    { key: 'name', title: t('categories.headers.name') },
    { key: 'description', title: t('categories.headers.description'), sortable: false },
    { key: 'actions', title: t('common.actions'), sortable: false, align: 'end' as const },
  ]);

  const featureHeaders = computed(() => [
    { key: 'name', title: t('categories.features.headers.name') },
    { key: 'measure', title: t('categories.features.headers.measure') },
    { key: 'actions', title: t('common.actions'), sortable: false, align: 'end' as const },
  ]);

  // ─── Computed: meta de dialogs (title/icon/color según modo) ──────────

  /**
   * Un solo computed reemplaza los seis computed individuales del original
   * (titleDialog, iconDialog, colorDialog × 2).
   */
  const categoryDialogMeta = computed(() => {
    const isNew = editedCategoryIndex.value === -1;
    return {
      title: isNew ? t('categories.dialog.titleNew') : t('categories.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const featureDialogMeta = computed(() => {
    const isNew = editedFeatureIndex.value === -1;
    return {
      title: isNew
        ? t('categories.features.dialog.titleNew')
        : t('categories.features.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  // ─── Reglas de validación ─────────────────────────────────────────────

  const categoryRules = computed(() => ({
    name: [v.required(), v.maxLength(80, t('categories.form.name'))],
    description: [v.required(), v.maxLength(255, t('categories.form.description'))],
  }));

  const featureRules = computed(() => ({
    name: [v.required(), v.maxLength(80, t('categories.features.form.name'))],
    measure: [v.required()],
  }));

  // ─── CRUD: categorías ─────────────────────────────────────────────────

  function openCategoryDialog(item?: Category): void {
    if (item) {
      loadingCategoryDialog.value = true;
      // Simula fetch por id — reemplazar con await categoryService.getById(item.id)
      setTimeout(() => {
        editedCategoryIndex.value = categories.value.indexOf(item);
        // structuredClone para no mutar el item original mientras se edita
        editedCategory.value = structuredClone(item);
        loadingCategoryDialog.value = false;
        dialogCategory.value = true;
      }, 300);
    } else {
      dialogCategory.value = true;
    }
  }

  function closeCategoryDialog(): void {
    dialogCategory.value = false;
    nextTick(() => {
      editedCategory.value = { ...defaultCategory };
      editedCategoryIndex.value = -1;
      categoryFormRef.value?.resetValidation();
    });
  }

  async function saveCategory(): Promise<void> {
    const { valid } = await categoryFormRef.value?.validate();
    if (!valid) return;

    loadingCategoryDialog.value = true;
    try {
      // await categoryService.save(editedCategory.value)
      if (editedCategoryIndex.value === -1) {
        categories.value.push({ ...editedCategory.value, id: Date.now().toString() });
      } else {
        categories.value[editedCategoryIndex.value] = structuredClone(editedCategory.value);
      }
      closeCategoryDialog();
    } finally {
      loadingCategoryDialog.value = false;
    }
  }

  function confirmDeleteCategory(item: Category): void {
    confirm.title = t('categories.dialog.deleteTitle', { name: item.name });
    confirm.message = t('categories.dialog.deleteMessage');
    confirm.icon = 'mdi-tag-remove-outline';
    confirm.onConfirm = async () => {
      confirm.loading = true;
      try {
        // await categoryService.delete(item.id)
        categories.value = categories.value.filter(c => c.id !== item.id);
        dialogConfirm.value = false;
      } finally {
        confirm.loading = false;
      }
    };
    dialogConfirm.value = true;
  }

  // ─── CRUD: características ────────────────────────────────────────────

  function openFeatureDialog(item?: Feature): void {
    if (item) {
      loadingFeatureDialog.value = true;
      setTimeout(() => {
        editedFeatureIndex.value = editedCategory.value.features.indexOf(item);
        editedFeature.value = structuredClone(item);
        loadingFeatureDialog.value = false;
        dialogFeature.value = true;
      }, 300);
    } else {
      dialogFeature.value = true;
    }
  }

  function closeFeatureDialog(): void {
    dialogFeature.value = false;
    nextTick(() => {
      editedFeature.value = { ...defaultFeature };
      editedFeatureIndex.value = -1;
      featureFormRef.value?.resetValidation();
    });
  }

  async function saveFeature(): Promise<void> {
    const { valid } = await featureFormRef.value?.validate();
    if (!valid) return;

    loadingFeatureDialog.value = true;
    try {
      // await featureService.save(editedFeature.value)
      const feature = { ...editedFeature.value };
      if (editedFeatureIndex.value === -1) {
        editedCategory.value.features.push({ ...feature, id: Date.now().toString() });
      } else {
        editedCategory.value.features[editedFeatureIndex.value] = structuredClone(feature);
      }
      closeFeatureDialog();
    } finally {
      loadingFeatureDialog.value = false;
    }
  }

  function confirmDeleteFeature(item: Feature): void {
    confirm.title = t('categories.features.dialog.deleteTitle', { name: item.name });
    confirm.message = t('categories.features.dialog.deleteMessage');
    confirm.icon = 'mdi-tag-remove-outline';
    confirm.onConfirm = async () => {
      confirm.loading = true;
      try {
        // await featureService.delete(item.id)
        editedCategory.value.features = editedCategory.value.features.filter(f => f.id !== item.id);
        dialogConfirm.value = false;
      } finally {
        confirm.loading = false;
      }
    };
    dialogConfirm.value = true;
  }

  // ─── Inicialización ───────────────────────────────────────────────────

  async function initialize(): Promise<void> {
    loadingCategories.value = true;
    try {
      // categories.value  = await categoryService.getAll()
      // measureItems.value = await measureService.getAll()

      // Mock data — eliminar al conectar la API
      categories.value = [
        {
          id: '1',
          name: 'Monitoreo',
          description: 'Miden signos vitales y corporales',
          features: [],
        },
        {
          id: '2',
          name: 'Respiratorio',
          description: 'Asisten en la respiración o suministro de oxígeno',
          features: [],
        },
        {
          id: '3',
          name: 'Laboratorio',
          description: 'Equipo para análisis clínicos',
          features: [],
        },
        {
          id: '4',
          name: 'Quirúrgico',
          description: 'Herramientas utilizadas en procedimientos médicos',
          features: [],
        },
        {
          id: '5',
          name: 'Neonatal',
          description: 'Cuidado médico para recién nacidos',
          features: [
            {
              id: '51',
              idCategory: '5',
              idMeasure: '1002',
              name: 'Peso',
              measure: 'Kilogramo',
              abbr: 'kg',
              icon: 'mdi-weight-kilogram',
              color: 'primary',
            },
            {
              id: '52',
              idCategory: '5',
              idMeasure: null,
              name: 'Certificaciones',
              measure: null,
              abbr: null,
              icon: null,
              color: null,
            },
            {
              id: '53',
              idCategory: '5',
              idMeasure: '1001',
              name: 'Panel de control',
              measure: 'Pulgada',
              abbr: 'in',
              icon: 'mdi-ruler',
              color: 'tertiary',
            },
          ],
        },
      ];
      measureItems.value = [
        { id: null, name: 'No aplica unidad', abbr: null, color: null, icon: null },
        {
          id: '1000',
          name: 'Grados Celsius',
          abbr: '°C',
          color: 'error',
          icon: 'mdi-thermometer-low',
        },
        {
          id: '1001',
          name: 'Kilogramo',
          abbr: 'kg',
          color: 'primary',
          icon: 'mdi-weight-kilogram',
        },
        { id: '1002', name: 'Pulgada', abbr: 'in', color: 'tertiary', icon: 'mdi-ruler' },
      ];
    } finally {
      loadingCategories.value = false;
    }
  }

  onMounted(initialize);
</script>
