<template>
  <v-container fluid class="bg-mywhite rounded-lg" style="max-width: 550px;">
    <v-row>
      <v-col cols="12" class="d-flex align-center ga-sm-10 ga-4 justify-center flex-sm-row flex-column">
        <general-date-picker
          v-model="dateValue"
          :label="$t('homePicker')"
          style="width: 200px"
          :min="dayjs().format('YYYY-MM-DD')"
          :max="maxDate"
        />
        <v-btn
          class="bg-second color-white"
          prepend-icon="mdi-calendar-search"
          :disabled="!dateValue"
          @click="redirection"
          >{{ $t('verDisponibilidad') }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking.js';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const props = defineProps({
  date: {
    type: String,
    default: ''
  }
});

const localePath = useLocalePath()
const useBooking = useBookingStore();
const maxDate = useBooking.max;
const router = useRouter();
dayjs.extend(customParseFormat);

const dateValue = ref(props.date);

const redirection = () => {
  const dateFormatted = dayjs(dateValue.value, "DD-MM-YYYY").format("YYYY-MM-DD");
  useBooking.updateDetails({date: dateFormatted});
  router.push({ path: localePath("/reservar"), query: { date: dateFormatted } });
};
</script>
