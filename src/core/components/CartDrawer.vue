<template>
  <v-navigation-drawer v-model="drawerModel" location="right" temporary order="0" width="360">
    <template #prepend>
      <v-toolbar class="border-b" rounded="0">
        <template #extension>
          <div class="text-body-2 text-center font-weight-bold text-medium-emphasis w-100">
            {{
              `${cartProducts} ${cartProducts === 1 ? t('cart.equipment.singular') : t('cart.equipment.plural')}`
            }}
          </div>
        </template>
        <v-icon icon="mdi-cart-outline" class="ml-4" opacity=".6" />
        <v-toolbar-title>{{ t('cart.title') }}</v-toolbar-title>
        <template #append>
          <v-btn icon="mdi-window-close" @click="drawerModel = false"></v-btn>
        </template>
      </v-toolbar>
    </template>
    <div v-if="cartItems.length === 0" class="h-100">
      <div class="h-100 text-medium-emphasis text-center d-flex align-center">
        <div class="w-100">
          <v-icon icon="mdi-cart-outline" size="32" />
          <div class="text-body-1 font-weight-bold">{{ t('cart.empty') }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <v-list v-if="rentItems.length > 0" lines="two">
        <v-list-subheader class="font-weight-black">{{ t('cart.rentSection') }}</v-list-subheader>
        <v-list-item v-for="(item, i) in rentItems" :key="i">
          <template #prepend>
            <v-avatar class="mr-2" variant="text">
              <v-img :src="item.photoUrl" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-title-small">{{ item.productName }}</v-list-item-title>
          <v-list-item-subtitle class="text-body-medium font-weight-medium">{{
            formatCurrency(item.rentalPrice)
          }}</v-list-item-subtitle>
          <template #append>
            <span class="text-body-2 font-weight-bold">{{
              `${item.quantity} ${t('cart.unit')} x ${item.rentalDays} ${item.rentalDays !== 1 ? t('cart.day.plural') : t('cart.day.singular')}`
            }}</span>
          </template>
        </v-list-item>
      </v-list>
      <v-list v-if="saleItems.length > 0" lines="two">
        <v-list-subheader class="font-weight-black">{{ t('cart.saleSection') }}</v-list-subheader>
        <v-list-item v-for="(item, i) in saleItems" :key="i">
          <template #prepend>
            <v-avatar class="mr-2" variant="text">
              <v-img :src="item.photoUrl" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-title-small">{{ item.productName }}</v-list-item-title>
          <v-list-item-subtitle class="text-body-medium font-weight-medium">{{
            formatCurrency(item.salePrice)
          }}</v-list-item-subtitle>
          <template #append>
            <span class="text-body-2 font-weight-bold">{{
              `${item.quantity} ${t('cart.unit')}`
            }}</span>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <template v-if="cartItems.length > 0" #append>
      <v-divider></v-divider>
      <div class="pa-4">
        <div v-if="rentItems.length > 0" class="d-flex justify-space-between mb-2">
          <div class="text-title-small text-medium-emphasis font-weight-bold">
            {{ t('cart.subtotalRent') }}
          </div>
          <div class="text-title-small font-weight-bold">{{ formatCurrency(rentTotal) }}</div>
        </div>
        <div v-if="saleItems.length > 0" class="d-flex justify-space-between mb-2">
          <div class="text-title-small text-medium-emphasis font-weight-bold">
            {{ t('cart.subtotalSale') }}
          </div>
          <div class="text-title-small font-weight-bold">{{ formatCurrency(saleTotal) }}</div>
        </div>
        <div class="d-flex justify-space-between mb-4">
          <div class="text-title-large text-medium-emphasis font-weight-black">
            {{ t('cart.total') }}
          </div>
          <div class="text-title-large font-weight-black">
            {{ formatCurrency(rentTotal + saleTotal) }}
          </div>
        </div>
        <v-btn-custom block>{{ t('cart.checkout') }}</v-btn-custom>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import type { CartItem } from '@/shared/types/CartTypes';
  import { formatCurrency } from '@/shared/utils/formatters';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { computed, ref, watch } from 'vue';

  const props = defineProps<{
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const { t } = useTypedLocale();

  const drawerModel = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  });

  const cartItems = ref<CartItem[]>([]);
  const cartProducts = computed(() =>
    cartItems.value.reduce((a, p) => {
      return a + p.quantity;
    }, 0)
  );

  const rentItems = computed(() => cartItems.value.filter(item => item.type.includes('RENTA')));

  const saleItems = computed(() => cartItems.value.filter(item => item.type.includes('VENTA')));

  const rentTotal = computed(() =>
    rentItems.value.reduce(
      (acc, item) => acc + (item.rentalPrice || 0) * item.quantity * (item.rentalDays || 0),
      0
    )
  );

  const saleTotal = computed(() =>
    saleItems.value.reduce((acc, item) => acc + item.salePrice! * item.quantity, 0)
  );

  const recoverCart = () => {
    const savedCart = localStorage.getItem('rentaMedicCartItems');
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart);
      } catch (e) {
        console.error('Error al parsear el carrito', e);
        cartItems.value = [];
      }
    }
  };

  watch(
    () => props.modelValue,
    (newVal: boolean) => {
      if (newVal) {
        recoverCart();
      }
    }
  );
</script>
