<template>
  <v-container fluid class="bg-mygrey rounded-xl">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <span class="color-main text-h4 text-sm-h3">DETALLES DE RESERVA</span>
        </div>
        <div class="text-body-2 text-sm-body-1">
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-calendar-range"></v-icon>
            <p>{{ dayjs(date).format("DD/MM/YYYY") }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-clock-outline"></v-icon>
            <p>{{ horario }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-hiking"></v-icon>
            <p>{{ activity }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-account-multiple"></v-icon>
            <p>{{ quantity }}</p>
          </div>
          <div class="d-flex pl-2 ga-2 align-center">
            <v-icon icon="mdi-cash"></v-icon>
            <p>{{ price.toLocaleString("es-Co") }}</p>
          </div>
          <v-checkbox
            v-model="almuerzo"
            label="¿Deseas incluir almuerzo casero por 13.000?"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="transporte"
            label="¿Deseas incluir carro privado por 200.000? (Máximo 4 personas)"
            hide-details
          ></v-checkbox>
        </div>
        <div class="d-flex align-center pt-3 text-body-2 text-sm-body-1">
          <v-col cols="6" class="text-start">
            <span> ¿Tienes código de descuento? </span>
          </v-col>
          <v-col cols="6">
            <v-text-field
              prepend-inner-icon="mdi-ticket"
              label="Código"
              variant="solo"
              :hide-details="true"
              v-model="voucher"
              @keyup.enter="discounts(voucher)"
            >
            </v-text-field>
            <p>{{ codeVerification }}</p>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from "/stores/booking.js";
const useBooking = useBookingStore();
import dayjs from "dayjs";

const { quantity, horario, activity, date } = useBooking;
const almuerzo = ref(false);
const transporte = ref(false);
const price = computed(() => useBooking.bookingPrice + useBooking.addonsPrice - useBooking.discount);

watch(almuerzo, (value) => {
  if (value == true) {
    useBooking.updateDetails({ addonsPrice: useBooking.addonsPrice + 13000 });
  } else {
    useBooking.updateDetails({ addonsPrice: useBooking.addonsPrice - 13000 });
  }
});

watch(transporte, (value) => {
  if (value == true) {
    useBooking.updateDetails({ addonsPrice: useBooking.addonsPrice + 200000 });
  } else {
    useBooking.updateDetails({ addonsPrice: useBooking.addonsPrice - 200000 });
  }
});

const voucher = ref("");
const codeVerification = ref("");
function discounts(discount) {
  codeVerification.value = useBooking.applyDiscount(discount);
}
</script>
