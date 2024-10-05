<template>
  <v-container fluid class="bg-mywhite rounded-lg">
    <v-row>
      <v-col cols="12" class="d-flex align-center ga-10">
        <general-date-picker
          v-model="dateValue"
          label="Día de actividad"
          style="max-width: 250px"
          :min="dayjs().format('YYYY-MM-DD')"
          :max="maxDate"
        />
        <v-btn
          class="bg-second color-white"
          prepend-icon="mdi-calendar-search"
          :disabled="!dateValue"
          @click="redirection"
          >Ver disponibilidad</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useBookingStore } from "/stores/booking.js";

const useBooking = useBookingStore();
const maxDate = ref(useBooking.max);
const router = useRouter();
dayjs.extend(customParseFormat);

const dateValue = ref();

const redirection = () => {
  const dateFormatted = dayjs(dateValue.value, "DD-MM-YYYY").format("YYYY-MM-DD");
  router.push({ path: "/reservar", query: { date: dateFormatted } });
};
</script>
