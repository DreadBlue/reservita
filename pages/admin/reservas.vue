<template>
    <general-loader v-if="loading" :loading-text="loaderText" />
    <v-container v-show="!loading" fluid class="pa-0 py-sm-8 py-15">
      <v-row>
        <v-col cols="12" md="3">
          <manage-banner-filter @update:bookings="bookings = $event" @update:loading="loading = $event"/>
        </v-col>
        <v-col cols="12" md="9">
          <manage-admin-bookings :bookings="bookings" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useBookingStore } from '/stores/booking.js';
  import { useI18n } from 'vue-i18n';

  definePageMeta({
    middleware: 'auth',
    layout: 'admin'
  });
  
  const { t } = useI18n();
  const useBooking = useBookingStore();
  let bookings = ref([]);
  
  let loading = ref(true);
  const loaderText = computed(()=> t('loadingBookings'));
  
  onMounted(() => {
    useBooking.currentPath == useRoute().path;
  });

  watchEffect(() => {
    if (bookings.value.length != 0) {
      loading.value = false;
    }
  });
  </script>
  