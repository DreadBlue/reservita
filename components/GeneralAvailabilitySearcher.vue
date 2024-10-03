<template>
  <v-container fluid class="bg-mywhite rounded-lg">
    <v-row>
      <v-col cols="12" class="d-flex align-center ga-10">
        <general-date-picker v-model="dateValue" label="Día de actividad" style="max-width: 250px;" />
        <v-btn
          class="bg-second color-white"
          prepend-icon="mdi-calendar-search"
          :disabled="!(dateValue)"
          >Ver disponibilidad</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const dateValue = ref();
</script>
