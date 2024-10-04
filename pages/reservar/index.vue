<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <GeneralAvailabilitySearcher/>
        <BookingOptions v-for="actividad in actividades" :key="actividad.titulo" :actividad="actividad" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import actividades from "@/assets/actividades.json";
import { useBookingStore } from '@/stores/booking';

const bookingStore = useBookingStore();

const { date } = useRoute().query;

onMounted(async () => {
  await bookingStore.getAvailability(date);
});
</script>