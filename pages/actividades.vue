<template>
  <v-container fluid class="pa-sm-0 px-0 pt-10">
    <v-row>
      <v-col>
        <GeneralBanner :model="presentation"/>
        <GeneralImageDescription v-for="activity in actividades" :item="activity" :key="activity.actividad"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import actividadesES from '@/assets/actividadesES.json'
import actividadesEN from '@/assets/actividadesEN.json'
import actividadesIT from '@/assets/actividadesIT.json'

const { t } = useI18n();
const { locale } = useI18n();

const presentation = computed (()=> {
  return {
    image: "/logo-cuadro.png",
    clases: "bg-main color-white",
    classTitle: "text-sm-h4 mb-10",
    title: "LA RESERVITA",
    descripcion: t('actDescription')
  }
})

const actividades = computed(()=> {
  if (locale.value === 'es') {
    return actividadesES;
  } else if (locale.value === 'en') {
    return actividadesEN;
  } else if (locale.value === 'it') {
    return actividadesIT;
  }
})

</script>