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
// import { useBookingStore } from "@/stores/booking.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// const useBooking = useBookingStore();
// const route = useRoute();
const idReserva = ref('');
const correo = ref('');
const model = {
  style: "background-image: url('/images/login.webp'); background-size: cover; background-position: center; height: 100%;",
}

const info = computed(() => {
  return {
        InputUno: [t('codigo'), t('codigo'), 'mdi-ticket'],
        InputDos: [
          t('correoTit'),
          t('correoAct'),
          'mdi-email-outline',
        ],
        Descripcion:
          t('miReservaDesc'),
        Login: false,
        btn: [t('gestionarRes'), `/reserva-${idReserva.value}/${correo.value}`],
      };
})

// onMounted(() => {
//   useBooking.currentPath = route.path;

// })

</script>