<template>
<v-container fluid class="pa-0 mb-8">
  <v-row>
    <v-col cols="12">
      <GeneralBanner :model="info"/>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="pa-0 pt-7 d-flex justify-center">
      <p class="color-main text-sm-h2 text-h4">{{$t('equipoTit')}}</p>
    </v-col>
    <v-divider class="px-15 my-8 color-main" :thickness="4" style="margin-left: 200px; margin-right: 200px; opacity: 1;"></v-divider>
  </v-row>
  
  <v-row class="mx-15">
    <v-col cols="12" sm="4" v-for="member in equipo" class="pa-0" :key="member.nombre">
      <GeneralBasicCard :item="member"/>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import equipoES from '@/assets/equipoES.json'
import equipoEN from '@/assets/equipoEN.json'
import equipoIT from '@/assets/equipoIT.json'
import GeneralBasicCard from '~/components/GeneralBasicCard.vue';

// const { t } = useI18n();
const { locale } = useI18n();

const info = {
  style: "background-image: url('/images/equipo.webp'); background-size: cover; background-position: center; height: 60vh;",
}

const equipo = computed(()=> {
  if (locale.value === 'es') {
    return equipoES;
  } else if (locale.value === 'en') {
    return equipoEN;
  } else if (locale.value === 'it') {
    return equipoIT;
  }
})
</script>