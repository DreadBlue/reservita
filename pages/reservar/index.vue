<template>
  <GeneralLoader
    v-if="!renderOptions"
    :loadingText="$t('loadingAvailability')"
  />
  <v-container fluid v-else class="py-sm-3 py-15">
    <v-row>
      <v-col cols="12">
        <GeneralAvailabilitySearcher :oldDate="date" />
      </v-col>
      <v-col cols="3">
        <booking-details-banner :btn="true" class="elevation-1" />
      </v-col>
      <v-col cols="9" class="d-flex flex-column ga-5 mb-3">
        <booking-activities-options
          v-for="actividad in actividades"
          :key="actividad.titulo"
          :activity="actividad"
          :availability="availability.data"
          class="elevation-4 rounded-lg"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import actividadesES from '@/assets/actividadesES.json';
import actividadesEN from '@/assets/actividadesEN.json';
import actividadesIT from '@/assets/actividadesIT.json';
import { useBookingStore } from '@/stores/booking';

const { locale } = useI18n();
const actividades = computed(() => {
  if (locale.value === 'es') {
    return actividadesES;
  } else if (locale.value === 'en') {
    return actividadesEN;
  } else if (locale.value === 'it') {
    return actividadesIT;
  }
});

const useBooking = useBookingStore();

const renderOptions = ref(false);
const availability = ref();
const { date } = useRoute().query;
// const localePath = useLocalePath();

// onBeforeMount(() => {
//   if (useBooking.date == false || !date) {
//     return navigateTo(localePath('/'));
//   }
// });

watch(
  availability,
  (newValue) => {
    const products = ref([]);
    for (const activity in newValue.data) {
      for (const schedule in newValue.data[activity]) {
        if (
          newValue.data[activity][schedule].quantity ||
          newValue.data[activity][schedule].quantity > 0
        ) {
          products.value = [
            ...products.value,
            newValue.data[activity][schedule],
          ];
        }
      }
    }
    useBooking.updateDetails({ products: products.value });
  },
  { deep: true },
);

onMounted(async () => {
  availability.value = await useBooking.getAvailability(date);
  console.log(availability.value);
  renderOptions.value = true;
});
</script>
