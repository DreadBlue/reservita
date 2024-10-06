<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <GeneralAvailabilitySearcher/>
        <BookingOptions v-if="renderOptions" v-for="actividad in actividades" :key="actividad.titulo" :actividad="actividad" :availability="availability" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import actividades from "../assets/actividades.json";
import { useBookingStore } from '@/stores/booking';

const bookingStore = useBookingStore();

const renderOptions = ref(false);
const availability = ref([]);
onMounted(async () => {
  const { date } = useRoute().query;
  const database = await bookingStore.getAvailability(date);
  renderOptions.value = true;
  availability.value = database;
});
</script>