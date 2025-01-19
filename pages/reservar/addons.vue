<template>
  <v-container fluid class="py-sm-3 py-15">
    <v-row>
      <v-col cols="3">
        <booking-details-banner :btn="true" class="elevation-1" />
      </v-col>
      <v-col cols="9">
        <booking-addons-options />
      </v-col>
    </v-row>
  </v-container>
</template>
