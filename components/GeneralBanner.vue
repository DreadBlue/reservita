<template>
  <v-container fluid class="pa-0 py-sm-15 py-8" :class="model.clases" :style="model.style">
    <v-row class="h-100">
      <v-col cols="12" class="d-flex flex-column justify-end align-center">
        <img v-if="model.image" :src="model.image" style="height: 80px;">
        <p v-if="model.title" :class="model.classTitle">{{ model.title }}</p>
        <div v-if="model.descripcion" class="text-center px-sm-15 mx-sm-15 px-10 text-sm-body-1 text-body-2" v-html="model.descripcion"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
defineProps({
  model: {
    type: Object,
    required: true,
  },
});
</script>
