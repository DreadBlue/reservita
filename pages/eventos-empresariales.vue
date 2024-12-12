<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <GeneralExperience v-for="activity in eventos" :item="activity" :key="activity.activities"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import eventosES from "@/assets/corporativoES.json"
import eventosEN from "@/assets/corporativoEN.json"
import eventosIT from "@/assets/corporativoIT.json"

const { locale } = useI18n();

const eventos = computed(()=> {
  if (locale.value === 'es') {
    return eventosES;
  } else if (locale.value === 'en') {
    return eventosEN;
  } else if (locale.value === 'it') {
    return eventosIT;
  }
})


</script>