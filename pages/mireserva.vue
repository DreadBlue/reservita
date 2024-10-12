<template>
  <v-container fluid class="pa-sm-0 py-10">
    <v-row class="mx-0">
      <v-col cols="12" sm="6" class="d-none d-sm-flex px-0" style="height: 90vh;">
        <GeneralBanner :model="model" />
      </v-col>
      <v-col cols="12" sm="6">
        <GeneralLogCredentials
          :formato="info"
          maxLength="3"
          v-model:fieldOne="idReserva"
          v-model:fieldTwo="correo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { useBookingStore } from "@/stores/booking.js";

const useBooking = useBookingStore();
const route = useRoute();
const idReserva = ref('');
const correo = ref('');
const model = {
  style: "background-image: url('/images/login.webp'); background-size: cover; background-position: center; height: 100%;",
}

const info = computed(() => {
  return {
        InputUno: ['Codigo de reserva', 'Codigo de reserva', 'mdi-ticket'],
        InputDos: [
          'Correo titular',
          'Ingresa tu correo electronico',
          'mdi-email-outline',
        ],
        Descripcion:
          '¡Hola! Bienvenido a casa, desde aquí podrás enviar solicitudes para modificar tus fechas de reserva, el titular o realizar la reserva anticipada de tu menú de comidas durante tu estancia',
        Login: false,
        btn: ['Gestionar reserva', `/reserva-${idReserva.value}/${correo.value}`],
      };
})

// onMounted(() => {
//   useBooking.currentPath = route.path;

// })

</script>