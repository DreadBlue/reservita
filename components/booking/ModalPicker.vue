<template>
<div v-if="showModal" class="d-flex justify-center align-center overlay" @click.self="useBooking.updateDetails({showModal: false})">
    <GeneralAvailabilitySearcher/>
</div>
</template>

<script setup>
import { useBookingStore } from '/stores/booking.js';

const useBooking = useBookingStore();
const showModal = computed(()=> useBooking.showModal)
</script>

<style scoped>
/* Fondo oscuro con opacidad */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Oscuro con opacidad */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Asegura que se sobreponga a todo */
}

/* Contenedor del DatePicker */
.datepicker-container {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>