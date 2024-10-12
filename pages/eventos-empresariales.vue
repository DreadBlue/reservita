<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <GeneralExperience v-for="activity in eventos" :item="activity"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import eventos from "@/assets/corporativo.json"

</script>