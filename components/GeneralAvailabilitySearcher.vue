<template>
  <v-container fluid class="bg-mywhite rounded-lg" style="max-width: 550px">
    <v-row>
      <v-col
        cols="12"
        class="d-flex align-center ga-sm-10 ga-4 justify-center flex-sm-row flex-column"
      >
        <general-date-picker
          v-model="date"
          :label="$t('homePicker')"
          style="width: 200px"
          :min="min"
        />
        <v-btn
          class="bg-second color-white"
          prepend-icon="mdi-calendar-search"
          :disabled="!date"
          @click="redirection"
          >{{ $t('verDisponibilidad') }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { DateTime } from 'luxon';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useBookingStore } from '/stores/booking.js';
import { useDisplay } from 'vuetify';

const props = defineProps({
  oldDate: {
    type: String,
    default: '',
  },
});

// const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
dayjs.extend(customParseFormat);
const { smAndUp } = useDisplay();
const reactiveHeight = ref('max-width: 85%');
const useBooking = useBookingStore();
const min = DateTime.local().toString().slice(0, 10);
// let minMonth = 0;
const date = ref(props.oldDate);

function redirection() {
  useBooking.updateDetails({ date: date.value, showModal: false });
  if (
    route.path == '/eventos-empresariales' ||
    route.path == '/eventos-empresariales/reservar'
  ) {
    router.push({
      path: '/eventos-empresariales/reservar',
      query: { date: date.value },
    });
  } else {
    router.push({
      path: '/reservar',
      query: { date: date.value },
    });
  }
}

watch(
  smAndUp,
  (val) => {
    reactiveHeight.value = val ? 'max-width: 95%' : 'max-width: 85%';
  },
  { immediate: true },
);
</script>
