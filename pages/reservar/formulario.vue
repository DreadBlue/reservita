<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <BookingForm/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking';

const useBooking = useBookingStore();
const localePath = useLocalePath()

const { date, actividad, amount } = useRoute().query;

onBeforeMount(() => {
    if (useBooking.date == false || useBooking.quantity == 0 || useBooking.id == false || useBooking.horario == false || !date || !actividad || !amount) {
        return navigateTo(localePath('/'));
    }
});

</script>