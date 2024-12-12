<template>
  <GeneralLoader v-if="!renderOptions" :loadingText="$t('loadingAvailability')"/>
  <v-container fluid v-else class="py-sm-3 py-15">
    <v-row>
      <v-col cols="12" class="d-flex flex-column ga-5 my-3">
        <GeneralAvailabilitySearcher :date="date" class="mb-3"/>
        <BookingOptions v-for="actividad in actividades" :key="actividad.titulo" :actividad="actividad" :availability="availability" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import actividadesES from '@/assets/actividadesES.json'
import actividadesEN from '@/assets/actividadesEN.json'
import actividadesIT from '@/assets/actividadesIT.json'
import { useBookingStore } from '@/stores/booking';

const { locale } = useI18n();
const actividades = computed(()=> {
  if (locale.value === 'es') {
    return actividadesES;
  } else if (locale.value === 'en') {
    return actividadesEN;
  } else if (locale.value === 'it') {
    return actividadesIT;
  }
})

const useBooking = useBookingStore();

const renderOptions = ref(false);
const availability = ref([]);
const {date} = useRoute().query;
const localePath = useLocalePath()

onBeforeMount(() => {
    if (useBooking.date == false || !date) {
        return navigateTo(localePath('/'));
    }
});

onMounted(async () => {
  const database = await useBooking.getAvailability(date);
  renderOptions.value = true;
  availability.value = database;
});
</script>