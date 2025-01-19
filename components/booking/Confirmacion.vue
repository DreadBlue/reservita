<template>
  <GeneralLoader v-if="loaded" :loading-text="textLoader" />
  <v-container fluid v-if="!loaded">
    <v-row class="d-flex justify-center text-center">
      <v-col cols="12" class="d-flex flex-column align-center">
        <span class="text-h3 text-sm-h2 color-main pt-10">{{
          $t('confirmacionTit')
        }}</span>
        <span class="color-main text-subtitle-2 text-sm-subtitle pt-3">{{
          $t('codigoRes') + bookingId
        }}</span>
      </v-col>
      <v-col
        cols="12"
        class="d-flex flex-column align-center text-body-2 text-sm-body-1 px-6 px-sm-3"
      >
        <span>{{ $t('envioCorreo') }} </span>
        <span>{{ $t('spam') }} </span>
        <div class="w-33 pa-10">
          <img src="/images/siembra.webp" alt="foto" class="w-100 h-100" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '/stores/booking.js';
import { useDisplay } from 'vuetify';

const useBooking = useBookingStore();
const bookingId = computed(() => useBooking.bookingId);

const { smAndDown } = useDisplay();
const reactiveHeight = ref('height: 450px');

let loaded = ref(true);
const textLoader = 'Confirmando reserva';

watch(
  smAndDown,
  (val) => {
    if (val == true) {
      reactiveHeight.value = 'height: 250px';
    } else {
      reactiveHeight.value = 'height: 450px';
    }
  },
  {
    immediate: true,
  },
);

watch(
  bookingId,
  (val) => {
    if (val !== '') {
      loaded = false;
    }
  },
  {
    immediate: true,
  },
);
</script>
