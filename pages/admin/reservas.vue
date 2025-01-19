<template>
  <general-loader v-if="loading" :loading-text="loaderText" />
  <v-container v-show="!loading" fluid class="pa-0 py-sm-8 py-15">
    <v-row>
      <v-col cols="12" md="3">
        <admin-banner-filter
          @update:bookings="bookings = $event"
          @update:loading="loading = $event"
        />
      </v-col>
      <v-col cols="12" md="9">
        <admin-bookings :bookings="bookings" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBookingStore } from '/stores/booking.js';
import { useAdminStore } from '/stores/admin.js';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});

const useBooking = useBookingStore();
const useAdmin = useAdminStore();
let bookings = ref([]);

const loading = ref(true);
const loaderText = 'Cargando reservas';

onMounted(async () => {
  bookings.value = await useAdmin.adminBookings();
  useBooking.currentPath == useRoute().path;
});
watchEffect(() => {
  if (bookings.value.length != 0) {
    loading.value = false;
  }
});
</script>
