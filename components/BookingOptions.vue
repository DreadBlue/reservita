<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <div class="w-100">
          <img :src="actividad.src" alt="foto-actividad" class="w-100" />
        </div>
      </v-col>
      <v-col cols="7">
        <div class="d-flex flex-column ga-3">
          <h1>{{ actividad.titulo }}</h1>
          <p>{{ actividad.descripcion }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="d-flex flex-column pl-5">
        <div v-for="precio in actividad.precio" :key="precio">{{ precio }}</div>
        <h2 class="mt-5">Seleccionar horario</h2>
        <v-chip-group v-model="horario" selected-class="bg-deep-purple-lighten-2">
          <v-chip>9:00 - 13:00</v-chip>
          <v-chip>13:00 - 17:00</v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="6">
        <div class="d-flex flex-column align-end pr-15">
          <h2>Cupos: 5</h2>
          <v-btn>Reservar</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useBookingStore } from "@/stores/booking";

defineProps({
  actividad: {
    type: Object,
    required: true,
  },
});

let horario = ref();

const bookingStore = useBookingStore();
</script>
