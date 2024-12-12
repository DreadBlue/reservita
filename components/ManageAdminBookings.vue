<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col v-if="displayed.length === 0" cols="12" sm="6" md="4">
        <v-card height="400" class="mx-auto d-flex justify-center align-center" min-width="320">
          <p class="text-subtitle-2">{{$t('noReservas')}}</p>
        </v-card>
      </v-col>
      <v-col v-for="item in displayed" cols="12" sm="6" md="4" :key="item.bookingId">
        <NuxtLink
          class="d-flex flex-wrap ga-4"
          style="text-decoration: none"
          :to="localePath(`/reserva-${item.bookingId}/${item.email}`)"
        >
          <v-card class="mx-auto" min-width="320">
            <v-img
              class="align-end text-white"
              height="200"
              :src="activitiesPic[item.activity]"
              cover
            >
              <v-card-title>{{ item.activity }} - {{ item.bookingId }}</v-card-title>
            </v-img>

            <v-card-text class="pt-4 texto-main">
              {{ capitalizeWords(item.name) }}
            </v-card-text>

            <v-card-subtitle class="d-flex flex-column px-4 pb-3 ga-1">
              <div>{{$t('fecha') + item.date }}</div>
              <v-divider
              :thickness="4"
              class="border-opacity-100 rounded color-main"
              />
              <div>{{$t('horarioCap') + item.horario }}</div>
              <v-divider
              :thickness="4"
              class="border-opacity-100 rounded color-main"
              />
              <div>{{ item.quantity + $t('persona')}}</div>
              <v-divider
              :thickness="4"
              class="border-opacity-100 rounded color-main"
              />
              <div>{{ item.almuerzo + ' ' + $t('almuerzoLabel')}}</div>
              <v-divider
              :thickness="4"
              class="border-opacity-100 rounded color-main"
              />
              <div>{{$t('transporteCap') + (item.transporte == 'incluido' ? $t('incluido') : $t('noIncluido')) }}</div>
            </v-card-subtitle>
          </v-card>
        </NuxtLink>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex justify-center">
        <v-card
          class="d-flex flex-column ga-3 justify-center align-center mx-3 bg-mygrey"
          min-width="320"
          min-height="280"
          @click="loadReservas"
        >
          <v-icon icon="mdi-plus-circle-outline" size="100"></v-icon>
          <p class="text-subtitle-2">{{$t('cargarReservas')}}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAdminStore } from '/stores/admin.js';

export default {
  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },
  data() {
    const useAdmin = useAdminStore();
    const localePath = useLocalePath()
    return {
      displayed: [],
      activitiesPic: {
        Arborismo: '/images/arborismo.webp',
        Safari: '/otros/imagen3.JPG',
        AncestralDos: '/cabanas/anamay.jpeg',
        Anamay: '/cabanas/anamay.jpeg',
      },
      useAdmin,
      localePath
    };
  },
  watch: {
    bookings: {
      immediate: true,
      handler(newBookings) {
        this.displayed = [...newBookings];
      },
    },
  },
  methods: {
    capitalizeWords(str) {
      return str.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    },
    async loadReservas() {
      const moreBookings = await this.useAdmin.cargarReservas();
      this.displayed = [...this.displayed, ...moreBookings];
    },
  },
};
</script>
