<template>
  <v-container fluid class="pa-0 py-sm-15 py-8" :class="model.clases">
    <v-row>
      <v-col cols="12">
        <p class="text-center px-sm-15 mx-sm-15 px-10 text-sm-body-1 text-body-2" :v-html="model.descripcion">
          {{ model.descripcion }}
        </p>
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
