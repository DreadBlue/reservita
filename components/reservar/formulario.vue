<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <BookingForm/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { date, horario, actividad } = useRoute().query;
</script>