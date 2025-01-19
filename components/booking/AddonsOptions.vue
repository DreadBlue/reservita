<template>
  <v-container>
    <v-row>
      <v-col
        class="d-flex flex-md-row flex-column ga-md-3 justify-center align-center"
      >
        <span class="text-md-h2 text-h3 color-main">AÑADE</span>
        <span class="text-md-h3 text-h4 color-second">A TU EXPERIENCIAS</span>
      </v-col>
    </v-row>
    <v-row class="my-5">
      <v-col v-for="(addon, key) in addons" :key="addon.name" cols="12" md="4">
        <v-card :style="{ backgroundImage: `url(${addon.img})` }">
          <v-card-title class="mt-5">
            <span class="color-white text-subtitle-1">{{
              addon.name.toUpperCase()
            }}</span>
          </v-card-title>
          <v-card-text class="color-white">
            {{ addon.description }}</v-card-text
          >
          <div
            style="height: 48px; width: 120px"
            class="bg-white rounded-xl d-flex align-center justify-center ml-10 mt-3 mb-2"
          >
            <v-icon
              icon="mdi-cash bg-second color-white rounded-xl ml-n4 pa-6"
              size="40"
            />
            <span class="ml-2 pr-5"
              >${{ addon.price.toLocaleString('es-Co') }}</span
            >
          </div>
          <span class="color-white text-body-2 ml-10">Precio por persona*</span>
          <div class="d-flex flex-column align-center mt-6">
            <v-number-input
              class="color-white w-50"
              variant="outlined"
              controlVariant="split"
              :min="0"
              v-model="addons[key].amount"
            ></v-number-input>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { useBookingStore } from '/stores/booking.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const useBooking = useBookingStore();
const addons = reactive({
  almuerzo: {
    img: '/booking/fiambre.jpg',
    name: 'Almuerzo local',
    description: t('almuerzoFiambre'),
    icon: 'mdi-food',
    price: 18000,
    amount: 0,
  },
  almuerzoSaludable: {
    img: '/booking/lunch.jpg',
    name: 'Almuerzo saludable',
    description: t('almuerzoSaludable'),
    icon: 'mdi-food',
    price: 18000,
    amount: 0,
  },
  transport: {
    img: '/booking/taxis.jpg',
    name: 'Transporte',
    description:
      'Embárcate en una emocionante aventura en las aguas rápidas de los ríos de la región. Perfecto para quienes buscan emociones fuertes, adrenalina y momentos llenos de risas en equipo.',
    icon: 'mdi-car',
    price: 200000,
    amount: 0,
  },
});

watch(
  addons,
  (newValue) => {
<<<<<<< HEAD
    const addons = ref({});
    for (const addon in newValue) {
      const name = newValue[addon].name;
      if (newValue[addon].amount || newValue[addon].amount > 0) {
        addons.value = { ...addons.value, [name]: newValue[addon] };
      }
    }
    console.log('addons', addons.value);
    useBooking.updateDetails({ addons: addons.value });
=======
    const products = ref([]);
    for (const addon in newValue) {
      if (newValue[addon].amount || newValue[addon].amount > 0) {
        products.value = [...products.value, newValue[addon]];
      }
    }
    useBooking.updateDetails({ addons: products.value });
>>>>>>> 91d6fa8 (booking process almost finished)
  },
  { deep: true },
);
</script>
