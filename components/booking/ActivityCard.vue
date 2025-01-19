<template>
  <v-container fluid class="pa-0 bg-white rounded-lg elevation-3">
    <v-row class="d-flex align-center">
      <v-col cols="8">
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon icon="mdi-hiking"></v-icon>
          <p>
            {{ props.product.act_id }}
          </p>
        </div>
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon icon="mdi-account-multiple"></v-icon>
          <p>{{ props.product.quantity }} participante(s)</p>
        </div>
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon icon="mdi-clock-outline"></v-icon>
          <p>{{ props.product.schedule }}</p>
        </div>
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon icon="mdi-cash"></v-icon>
          <p>{{ localProduct.price.toLocaleString('es-co') }}</p>
        </div>
      </v-col>
      <v-col cols="4">
        <v-btn class="bg-main color-white">x</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
  },
});

const localProduct = reactive(props.product);

async function updatePrice(quantity, activity) {
  if (activity == 'Arborismo') {
    if (quantity == 1) {
      localProduct.price = 100000 * quantity;
    } else if (quantity <= 5) {
      localProduct.price = 80000 * quantity;
    } else if (quantity <= 8) {
      localProduct.price = 70000 * quantity;
    } else if (quantity <= 15) {
      localProduct.price = 50000 * quantity;
    }
  } else if (activity == 'Canyoning') {
    if (quantity == 1) {
      localProduct.price = 190000 * quantity;
    } else if (quantity <= 5) {
      localProduct.price = 170000 * quantity;
    } else if (quantity <= 8) {
      localProduct.price = 150000 * quantity;
    } else if (quantity <= 15) {
      localProduct.price = 140000 * quantity;
    } else if (quantity <= 20) {
      localProduct.price = 110000 * quantity;
    }
  } else if (activity == 'Aventura') {
    if (quantity == 1) {
      localProduct.price = 230000 * quantity;
    } else if (quantity <= 12) {
      localProduct.price = 200000 * quantity;
    } else if (quantity <= 20) {
      localProduct.price = 180000 * quantity;
    }
  }
}

watch(
  localProduct,
  async (newValue) => {
    await updatePrice(newValue.quantity, newValue.act_id);
  },
  { immediate: true },
);
</script>
