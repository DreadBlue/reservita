<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <GeneralBannerText :model="info"/>
    </v-col>
    <v-col cols="4" v-for="member in equipo">
      <PresentationCard :item="member"/>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import PresentationCard from '~/components/PresentationCard.vue';
import equipo from '@/assets/equipo.json';
import GeneralBannerText from '~/components/GeneralBannerText.vue';

const info = {
  clases: 'f',
  descripcion: 's',
}
</script>