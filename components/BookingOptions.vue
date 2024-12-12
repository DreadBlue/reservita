<template>
  <v-container :class="actividad.background">
    <v-row>
      <v-col cols="12" sm="5">
        <div class="w-100">
          <img :src="actividad.src" alt="foto-actividad" class="w-100" />
        </div>
      </v-col>
      <v-col cols="12" sm="7">
        <div class="d-flex flex-column ga-3">
          <h1>{{ actividad.titulo }}</h1>
          <p>{{ actividad.descripcion }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" class="d-flex flex-column pl-5">
        <div v-for="precio in actividad.precio" :key="precio">{{ precio }}</div>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-end justify-end">
        <div class="d-flex flex-column align-sm-center align-start pr-15">
          <h2>
            {{ $t("cuposLabel") }}
            {{ selected != undefined ? spots[selected] : $t("cupos") }}
          </h2>
          <v-chip-group
            v-model="selected"
            selected-class="bg-deep-purple-lighten-2"
          >
            <v-chip>9:00 - 13:00</v-chip>
            <v-chip>13:00 - 17:00</v-chip>
          </v-chip-group>
          <v-select
            :disabled="selected == null"
            :items="selected == 0 ? amountOptions[0] : amountOptions[1]"
            :label="$t('cantidad')"
            width="140"
            variant="outlined"
            class="pt-2"
            v-model="amount"
          ></v-select>
          <v-btn
            @click="handleReservation()"
            class="bg-second color-white"
            :disabled="selected == null"
            >{{ $t("reservar") }}</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking.js";

const useBooking = useBookingStore();
const router = useRouter();
const localePath = useLocalePath();

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
const spots = ref([]);
const amountOptions = ref([]);
const amount = ref(null);
const horario = ref(null);
const activity = props.availability.filter((act) =>
  act.id.includes(props.actividad.availability)
);

const handleReservation = () => {
  horario.value = selected.value == 0 ? "9:00 - 13:00" : "13:00 - 17:00";
  const id = props.availability[selected.value].id;
  const { date } = useRoute().query;
  useBooking.updatePrice(amount.value, props.actividad.availability);
  useBooking.updateDetails({
    quantity: amount.value,
    id: id,
    horario: horario.value,
    activity: props.actividad.actividad,
  });
  router.push({
    path: localePath("/reservar/formulario"),
    query: { date: date, actividad: id, amount: amount.value },
  });
};

onMounted(() => {
  for (const act of activity) {
    const options = ref([]);
    for (let i = 1; i <= act.spots; i++) {
      options.value.push(i);
    }
    amountOptions.value.push(options.value);
    spots.value.push(options.value.length);
  }
});
</script>
