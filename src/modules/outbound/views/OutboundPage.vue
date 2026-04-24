<template>
  <v-container fluid>
    <TableCard
      icon="mdi-elevator-down"
      :title="t('outbound.page.title')"
      :subtitle="t('outbound.page.subtitle')"
    >
      <v-row density="compact">
        <v-col cols="12" sm="12" md="6" lg="8" xl="9">
          <IteratorHeader>
            <v-btn-custom prepend-icon="mdi-plus" :block="smAndDown" @click="openOutbound()">{{
              t('outbound.actions.add')
            }}</v-btn-custom>
          </IteratorHeader>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4" xl="3">
          <IteratorHeader>
            <v-text-field
              v-model="state.search"
              :placeholder="t('outbound.search')"
              single-line
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </IteratorHeader>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :items="outboundItems"
            :headers="outboundHeaders"
            :search="state.search"
            :loading="state.loadingTable"
          >
            <template #loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template #item.folio="{ value }">
              <v-chip variant="text">{{ value }}</v-chip>
            </template>
            <template #item.outboundType="{ value }">
              <v-chip :prepend-icon="outboundTypeIcon(value)">{{ outboundTypeText(value) }}</v-chip>
            </template>
            <template #item.totalAmount="{ value }">
              <v-icon icon="mdi-cash" color="success" class="mr-2"></v-icon>
              <span>{{ `$ ${value}` }}</span>
            </template>
            <template #item.actions="{ item }">
              <TooltipButton
                icon="mdi-open-in-new"
                :text="t('outbound.actions.expand')"
                color="secondary"
                @click="openOutbound(item)"
              ></TooltipButton>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </TableCard>
    <DialogCard
      v-model="state.dialogOutbound"
      fullscreen
      :icon="outboundDialogMeta.icon"
      :title="outboundDialogMeta.title"
      @close="closeOutboundDialog()"
    >
      <v-form v-model="state.validForm" @submit.prevent>
        <v-row>
          <v-col cols="12">
            <FormCard icon="mdi-elevator-down" :title="t('outbound.form.equipmentTitle')">
              <v-row>
                <v-col cols="12" sm="12" md="2" lg="2" xl="2">
                  <v-text-field
                    v-model="editedOutbound.folio"
                    :label="t('outbound.form.folio')"
                    hint="No editable"
                    prepend-inner-icon="mdi-identifier"
                    :counter="false"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="2" offset-md="8" lg="2" xl="2">
                  <v-text-field
                    v-model="editedOutbound.datetime"
                    type="datetime-local"
                    :label="t('outbound.form.datetime')"
                    hint="No editable"
                    prepend-inner-icon="mdi-calendar-outline"
                    :counter="false"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <v-select
                    v-model="editedOutbound.outboundType"
                    :label="t('outbound.form.outboundType')"
                    :items="outboundType"
                    :rules="outboundRules.outboundType"
                    :readonly="isEditing"
                    @update:model-value="handleInputType"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <template v-if="editedOutbound.outboundType === 'TRANSFER'">
                    <v-select
                      v-model="editedOutbound.destinationLocationId"
                      :label="t('outbound.form.destinationLocation')"
                      prepend-inner-icon="mdi-map-marker-outline"
                      :items="destinationLocations"
                      item-value="id"
                      item-title="name"
                      :rules="outboundRules.destinationLocation"
                      :readonly="isEditing"
                    ></v-select>
                  </template>
                  <template v-else-if="editedOutbound.outboundType === 'SALE'">
                    <v-select
                      v-model="editedOutbound.purchaserId"
                      :label="t('outbound.form.purchaser')"
                      prepend-inner-icon="mdi-handshake-outline"
                      :items="purchasers"
                      item-value="id"
                      item-title="name"
                      :rules="outboundRules.purchaser"
                      :readonly="isEditing"
                    ></v-select>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <v-text-field
                    v-model="editedOutbound.totalAmount"
                    :label="t('outbound.form.totalAmount')"
                    inputmode="decimal"
                    prepend-inner-icon="mdi-cash"
                    prefix="$"
                    :disabled="editedOutbound.outboundType !== 'SALE'"
                    :rules="outboundRules.totalAmount"
                    :readonly="isEditing"
                    :counter="false"
                    @keydown="validateNumberInput($event, editedOutbound.totalAmount)"
                    @input="handleTotalAmountInput"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-textarea
                    v-model="editedOutbound.note"
                    :label="t('outbound.form.note')"
                    prepend-inner-icon="mdi-text-long"
                    :rules="outboundRules.note"
                    :readonly="isEditing"
                  ></v-textarea>
                </v-col>
              </v-row>
            </FormCard>
          </v-col>
          <v-col cols="12">
            <FormCard icon="mdi-hospital-box-outline" title="Equipo a Recibir">
              <v-data-table
                :items="editedOutbound.equipment"
                :headers="tableHeaders"
                items-per-page="-1"
                hide-default-footer
                fixed-header
              >
                <template #item.barcode="{ index }">
                  <v-text-field
                    :ref="el => setInputRef(index, 'barcode', el)"
                    v-model="editedOutbound.equipment[index].barcode"
                    density="compact"
                    base-color="surface"
                    placeholder="Código de barras"
                    hide-details
                    :readonly="isEditing"
                    :rules="tableRules.barcode"
                    :prepend-icon="
                      editedOutbound.equipment[index].codeValid
                        ? 'mdi-check-circle-outline'
                        : 'mdi-alert-circle-outline'
                    "
                    @keydown.enter="handleEnter($event, index, 'barcode')"
                    @keydown.tab="handleEnter($event, index, 'barcode')"
                  >
                  </v-text-field>
                </template>
                <template #item.quantity="{ index }">
                  <v-text-field
                    :ref="el => setInputRef(index, 'quantity', el)"
                    v-model="editedOutbound.equipment[index].quantity"
                    base-color="surface"
                    placeholder="Cantidad"
                    type="number"
                    min="1"
                    density="compact"
                    hide-details
                    :readonly="isEditing"
                    :rules="tableRules.quantity"
                    @keydown.enter="handleEnterStock($event, index)"
                    @keydown.tab="handleEnterStock($event, index)"
                    @keypress="onlyIntegerNumbers"
                  ></v-text-field>
                </template>
                <template #item.actions="{ item }">
                  <TooltipButton
                    icon="mdi-delete-outline"
                    :text="t('outbound.actions.discardEquipment')"
                    color="error"
                    :disabled="isEditing"
                    @click="deleteEquipment(item)"
                  ></TooltipButton>
                </template>
              </v-data-table>
            </FormCard>
          </v-col>
          <v-col v-if="!isEditing" cols="12">
            <v-btn-custom :disabled="!isValidForm" @click="saveOutbound">{{
              t('outbound.actions.generateOutbound')
            }}</v-btn-custom>
          </v-col>
        </v-row>
      </v-form>
      <v-tooltip v-if="!isEditing" :text="t('outbound.actions.scanEquipment')">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-barcode-scan"
            color="primary"
            size="x-large"
            rounded="circle"
            style="z-index: 1000; position: fixed; right: 16px; bottom: 16px"
            v-bind="activatorProps"
            @click="openScanner()"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip v-if="!isEditing" :text="t('outbound.actions.addEquipmentManually')">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-plus"
            color="secondary"
            size="x-large"
            rounded="circle"
            style="z-index: 1000; position: fixed; right: 90px; bottom: 16px"
            v-bind="activatorProps"
            @click="createNewRegister()"
          ></v-btn>
        </template>
      </v-tooltip>
      <ScannerPicker
        v-model="state.dialogScanner"
        @detected-code="handleScanner"
        @close="closeScanner"
      ></ScannerPicker>
    </DialogCard>
  </v-container>
</template>
<script setup lang="ts">
  import TableCard from '@/shared/components/TableCard.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';
  import ScannerPicker from '@/shared/components/ScannerPicker.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import { computed, nextTick, onMounted, reactive, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import type {
    EquipmentScanner,
    OutboundForm,
    OutboundLightResponse,
    LocationLightResponse,
    PurchaserLightResponse,
  } from '../types/OutboundTypes';
  import {
    mockEquipmentProducts,
    mockOutbounds,
    mockLocationsLight,
    mockPurchasersLight,
  } from '../MockData';
  import {
    formatCurrencyValue,
    onlyIntegerNumbers,
    validateNumberInput,
  } from '@/shared/utils/helpers';
  import { useTableFocus } from '@/shared/composables/useTableFocus';

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  function outboundTypeIcon(outboundType: string): string {
    const map: Record<string, string> = {
      SALE: 'mdi-sale-outline',
      TRANSFER: 'mdi-map-marker-outline',
    };
    return map[outboundType] ?? 'default';
  }

  function outboundTypeText(outboundType: string): string {
    const map: Record<string, string> = {
      SALE: t('outbound.type.sale'),
      TRANSFER: t('outbound.type.transfer'),
    };
    return map[outboundType] ?? '';
  }

  const mapOutboundToLight = (outbound: OutboundForm): OutboundLightResponse => {
    return {
      id: outbound.id,
      folio: outbound.folio,
      datetime: outbound.datetime,
      outboundType: outbound.outboundType,
      totalAmount: outbound.totalAmount,
    };
  };

  const { t } = useTypedLocale();
  const { smAndDown } = useDisplay();
  const v = createValidators(t);
  const { toast } = useSwal();
  const { setInputRef, focusInput } = useTableFocus();

  const state = reactive({
    search: '',
    loadingOutboundForm: false,
    dialogOutbound: false,
    dialogScanner: false,
    loadingTable: false,
    validForm: false,
  });
  const outboundItems = ref<OutboundLightResponse[]>([]);
  const defaultOutbound: OutboundForm = {
    id: '',
    folio: '',
    outboundType: 'SALE',
    datetime: new Date().toISOString().slice(0, 16),
    totalAmount: '',
    destinationLocationId: '',
    purchaserId: '',
    note: '',
    equipment: [],
  };
  const editedOutbound = ref<OutboundForm>({ ...defaultOutbound });
  const editedOutboundIndex = ref(-1);

  const outboundRules = computed(() => ({
    outboundType: [v.required()],
    totalAmount: [v.required()],
    note: [v.maxLength(300)],
    destinationLocation: [v.required()],
    purchaser: [v.required()],
  }));

  const tableRules = computed(() => ({
    barcode: [v.required(), v.maxLength(15)],
    quantity: [v.required(), v.minNumber(1), v.maxNumber(30)],
  }));

  const outboundHeaders = computed(() => [
    { key: 'folio', title: t('outbound.headers.folio'), sortable: false },
    { key: 'outboundType', title: t('outbound.headers.outboundType'), sortable: false },
    { key: 'datetime', title: t('outbound.headers.datetime'), sortable: false },
    { key: 'totalAmount', title: t('outbound.headers.totalAmount'), sortable: false },
    {
      key: 'actions',
      title: t('outbound.headers.actions'),
      sortable: false,
      align: 'end' as const,
      width: '40',
    },
  ]);

  const tableHeaders = computed(() => [
    {
      key: 'barcode',
      title: t('outbound.form.headers.barcode'),
      value: 'barcode',
      sortable: false,
      width: '300',
    },
    { key: 'name', title: t('outbound.form.headers.name'), sortable: false },
    { key: 'quantity', title: t('outbound.form.headers.quantity'), sortable: false, width: '200' },
    {
      key: 'actions',
      title: t('outbound.form.headers.actions'),
      sortable: false,
      align: 'center' as const,
      width: '40',
    },
  ]);

  const outboundType = computed(() => [
    { value: 'TRANSFER', title: t('outbound.type.transfer') },
    { value: 'SALE', title: t('outbound.type.sale') },
  ]);

  const purchasers = ref<PurchaserLightResponse[]>([]);
  const destinationLocations = ref<LocationLightResponse[]>([]);

  const isEditing = computed(() => editedOutboundIndex.value !== -1);

  const outboundDialogMeta = computed(() => {
    return {
      title: isEditing.value ? t('outbound.dialog.titleEdit') : t('outbound.dialog.titleNew'),
      icon: isEditing.value ? 'mdi-circle-edit-outline' : 'mdi-plus',
      color: isEditing.value ? 'secondary' : 'primary',
    };
  });

  const isValidForm = computed(() => {
    const length = editedOutbound.value.equipment.length > 0;
    let codeValid = false;
    if (length) {
      codeValid = editedOutbound.value.equipment.every(i => i.codeValid === true);
    }
    return state.validForm && length && codeValid;
  });

  const closeOutboundDialog = () => {
    state.dialogOutbound = false;
    nextTick(() => {
      editedOutbound.value = Object.assign({}, defaultOutbound);
      editedOutboundIndex.value = -1;
    });
  };

  const createNewRegister = () => {
    const newRegister: EquipmentScanner = {
      productId: '',
      barcode: '',
      name: '',
      quantity: 1,
      codeValid: false,
    };
    editedOutbound.value.equipment.push(newRegister);
  };

  const handleEnter = async (e: Event, index: number, field: string) => {
    e.preventDefault();
    if (field === 'barcode') {
      const barcode = editedOutbound.value.equipment[index].barcode;
      if (!barcode) return;
      const equipmentScanner: EquipmentScanner | undefined = mockEquipmentProducts.find(
        m => m.barcode === barcode
      );
      if (!equipmentScanner) {
        toast('warning', t('outbound.notifications.equipmentNotFound'));
        return;
      }
      editedOutbound.value.equipment[index] = { ...equipmentScanner, quantity: 1 };
      await focusInput(index, 'quantity');
    }
  };

  const handleEnterStock = async (e: KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (editedOutbound.value.equipment.length === index + 1) {
        createNewRegister();
      }
      e.preventDefault();
      await focusInput(index + 1, 'barcode');
    }
  };

  const handleInputType = () => {
    editedOutbound.value.totalAmount = '0';
    editedOutbound.value.purchaserId = '';
    editedOutbound.value.destinationLocationId = '';
  };

  const openScanner = () => {
    state.dialogScanner = true;
  };

  const closeScanner = () => {
    state.dialogScanner = false;
  };

  const deleteEquipment = (item: EquipmentScanner) => {
    editedOutbound.value.equipment = editedOutbound.value.equipment.filter(
      i => i.barcode !== item.barcode
    );
    toast('success', t('outbound.notifications.outboundDiscarded'));
  };

  const initialize = () => {
    outboundItems.value = mockOutbounds.map(mapOutboundToLight);
    purchasers.value.push(...mockPurchasersLight);
    state.loadingTable = true;
    setTimeout(() => {
      purchasers.value = mockPurchasersLight;
      destinationLocations.value = mockLocationsLight;
      state.loadingTable = false;
    }, 1000);
  };
  const openOutbound = (item?: OutboundLightResponse): void => {
    if (item) {
      emit('loadingChange', true);
      setTimeout(() => {
        editedOutboundIndex.value = outboundItems.value.indexOf(item);
        editedOutbound.value = { ...mockOutbounds.find(i => i.id === item.id)! };
        state.dialogOutbound = true;
        emit('loadingChange', false);
      }, 1000);
    } else {
      state.dialogOutbound = true;
    }
  };

  const handleTotalAmountInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    editedOutbound.value.totalAmount = formatCurrencyValue(input.value);
  };

  const handleScanner = (barcode: string) => {
    if (!barcode) return;
    const equipmentScanner: EquipmentScanner | undefined = mockEquipmentProducts.find(
      m => m.barcode === barcode
    );
    if (!equipmentScanner) {
      toast('warning', t('outbound.notifications.equipmentNotFound'));
      return;
    }
    editedOutbound.value.equipment.push({ ...equipmentScanner, quantity: 1 });
    toast('success', equipmentScanner.name);
  };

  const saveOutbound = () => {
    state.loadingOutboundForm = true;
    setTimeout(() => {
      const lightResult = mapOutboundToLight(editedOutbound.value);
      outboundItems.value.push({ ...lightResult, folio: 'INB-0006' });
      state.loadingOutboundForm = false;
      closeOutboundDialog();
    }, 1000);
  };

  onMounted(initialize);
</script>
