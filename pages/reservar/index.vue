<template>
  <GeneralLoader v-if="!renderOptions" loadingText="Cargando disponibilidad..."/>
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
import actividades from "../assets/actividades.json";
import { useBookingStore } from '@/stores/booking';

const useBooking = useBookingStore();

const renderOptions = ref(false);
const availability = ref([]);
const {date} = useRoute().query;

onBeforeMount(() => {
    if (useBooking.date == false || !date) {
        return navigateTo('/');
    }
});

onMounted(async () => {
  const database = await useBooking.getAvailability(date);
  renderOptions.value = true;
  availability.value = database;
});
</script>