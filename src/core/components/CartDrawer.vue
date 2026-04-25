<template>
  <v-navigation-drawer v-model="drawerModel" location="right" temporary order="0" width="400">
    <template #prepend>
      <v-toolbar class="border-b" rounded="0">
        <template #extension>
          <div class="text-body-2 text-center font-weight-bold text-medium-emphasis w-100">
            {{ `${cartProducts} ${cartProducts === 1 ? 'equipo' : 'equipos'}` }}
          </div>
        </template>
        <v-icon icon="mdi-cart-outline" class="ml-4" opacity=".6" />
        <v-toolbar-title>Mi Carrito</v-toolbar-title>
        <template #append>
          <v-btn icon="mdi-window-close" @click="emit('update:modelValue', false)"></v-btn>
        </template>
      </v-toolbar>
    </template>
    <div v-if="cartItems.length === 0" class="h-100">
      <div class="h-100 text-medium-emphasis text-center d-flex align-center">
        <div class="w-100">
          <v-icon icon="mdi-cart-outline" size="32" />
          <div class="text-body-1 font-weight-bold">Tu carrito está vacío</div>
        </div>
      </div>
    </div>
    <div v-else>
      <v-list lines="two">
        <v-list-item v-for="(item, i) in cartItems" :key="i">
          <template #prepend>
            <v-avatar class="mr-2">
              <v-img :src="item.photoUrl" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-title-small">{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-body-medium font-weight-medium">{{
            `$ ${item.price}`
          }}</v-list-item-subtitle>
          <template #append>
            <span class="text-body-2 font-weight-bold">{{ `${item.stock} u.` }}</span>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <template v-if="cartItems.length > 0" #append>
      <v-divider></v-divider>
      <div class="pa-2">
        <div class="d-flex justify-space-between mb-2">
          <div class="text-h6 text-medium-emphasis font-weight-bold">Total</div>
          <div class="text-h6 font-weight-bold">$ 10,350.0</div>
        </div>
        <v-btn-custom block>Rentar equipo médico</v-btn-custom>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const props = defineProps<{
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const drawerModel = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  });

  interface EquipmentCart {
    id: string;
    name: string;
    photoUrl: string;
    price: number;
    stock: number;
  }

  const cartItems = ref<EquipmentCart[]>([
    {
      id: '10',
      name: 'Phoroptor Yeosn SLY-100',
      photoUrl: 'https://isem.mx/wp-content/uploads/2019/11/phoroptorpartetrasera.jpg',
      price: 3000.0,
      stock: 1,
    },
    {
      id: '20',
      name: 'Sistema VIOS 300s',
      photoUrl:
        'https://www.somatechnology.com/spanish/wp-content/uploads/sites/2/2018/03/ERBE-VIO-300S-Electrobisturis-2.jpg',
      price: 6000.0,
      stock: 2,
    },
    {
      id: '30',
      name: 'Morcelador Gomedil 2025',
      photoUrl:
        'https://endoscopia-gdl.com.mx/wp-content/uploads/2024/07/PAGINA-WEB-MORCELADOR-HAWK-2024.jpg',
      price: 1350.0,
      stock: 1,
    },
  ]);
  const cartProducts = computed(() =>
    cartItems.value.reduce((a, p) => {
      return a + p.stock;
    }, 0)
  );
</script>
