<template>
<v-container fluid class="pa-0 mb-8">
  <v-row>
    <v-col cols="12">
      <GeneralBannerText :model="info"/>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pa-0 pt-7 d-flex justify-center">
      <p class="color-main text-sm-h2 text-h4">EQUIPO RESERVITA</p>
    </v-col>
    <v-divider class="mx-15 px-15 my-8 color-main" :thickness="5"></v-divider>
  </v-row>
  
  <v-row class="mx-15">
    <v-col cols="12" sm="4" v-for="member in equipo" class="pa-0">
      <GeneralBasicCard :item="member"/>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import equipo from '@/assets/equipo.json';
import GeneralBasicCard from '~/components/GeneralBasicCard.vue';

const info = {
  style: "background-image: url('/images/equipo.webp'); background-size: cover; background-position: center; height: 60vh;",
}
</script>