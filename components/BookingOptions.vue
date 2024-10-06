<template>
  <v-container :class="actividad.background">
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
        <v-chip-group
          v-model="selected"
          selected-class="bg-deep-purple-lighten-2"
        >
          <v-chip @click="handleSpots(0)">9:00 - 13:00</v-chip>
          <v-chip @click="handleSpots(1)">13:00 - 17:00</v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="6" class="d-flex align-end justify-end">
        <div class="d-flex flex-column align-end pr-15">
          <h2>Cupos: {{ spots }}</h2>
          <v-select :disabled="selected === null" :items="amountOptions" label="Cantidad" width="140" variant="outlined" class="pt-2" v-model="amount"
          ></v-select>
          <v-btn @click="handleReservation()" class="bg-second color-white">Reservar</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking.js';

const useBooking = useBookingStore();
const router = useRouter();

const props = defineProps({
  actividad: {
    type: Object,
    required: true,
  },
  availability: {
    type: Array,
    required: true,
  },
  background: {
    type: String,
    default: undefined,
  },
});
const selected = ref(null);
const spots = ref("Seleccione horario");
const amountOptions = ref([]);
const amount = ref(null);
const horario = ref(null);
const handleSpots = (index) => {
  horario.value = index == 0 ? '9:00 - 13:00' : '13:00 - 17:00';
  spots.value = props.availability[index].spots;
  for (let i = 1; i <= props.availability[index].spots; i++) {
    amountOptions.value.push(i);
  }
};

const handleReservation = () => {
  const id = props.availability[selected.value].id;
  const { date } = useRoute().query;
  useBooking.updatePrice(amount.value, props.actividad.availability);
  useBooking.updateDetails({quantity: amount.value, id: id, horario: horario.value, activity: props.actividad.actividad});
  router.push({
    path: "/reservar/formulario",
    query: { date: date, actividad: id, amount: amount.value },
  });
};
</script>