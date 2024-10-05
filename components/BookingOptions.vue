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
        <v-chip-group
          v-model="horario"
          selected-class="bg-deep-purple-lighten-2"
        >
          <v-chip @click="handleSpots(0)">9:00 - 13:00</v-chip>
          <v-chip @click="handleSpots(1)">13:00 - 17:00</v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="6" class="d-flex align-end justify-end">
        <div class="d-flex flex-column align-end pr-15">
          <h2>Cupos: {{ spots }}</h2>
          <v-select :disabled="horario === null" :items="amountOptions" label="Cantidad" width="140" variant="outlined" class="pt-2" v-model="amount"
          ></v-select>
          <v-btn @click="handleReservation()" class="bg-second color-white">Reservar</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
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
});
const horario = ref(null);
const spots = ref("Seleccione horario");
const amountOptions = ref([]);
const amount = ref(null);
const handleSpots = (index) => {
  spots.value = props.availability[index].spots;
  for (let i = 0; i <= props.availability[index].spots; i++) {
    amountOptions.value.push(i);
  }
};

const handleReservation = () => {
  const hora = horario.value === 0 ? "morning" : "afternoon";
  const { date } = useRoute().query;
  router.push({
    path: "/reservar/formulario",
    query: { Cdate: date, horario: hora, actividad: props.actividad.titulo, amount: amount.value },
  });
};
</script>
