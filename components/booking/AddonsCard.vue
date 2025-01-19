<template>
  <v-container fluid class="pa-0 bg-white rounded-lg elevation-3">
    <v-row class="d-flex align-center">
      <v-col cols="8">
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon :icon="props.addon.icon"></v-icon>
          <p>{{ props.addon.name }}</p>
        </div>
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon icon="mdi-account-multiple"></v-icon>
          <p>{{ props.addon.amount }}</p>
        </div>
        <div class="d-flex pl-2 ga-2 align-center">
          <v-icon icon="mdi-cash"></v-icon>
          <p>{{ props.addon.addonPrice.toLocaleString('es-co') }}</p>
        </div>
      </v-col>
      <v-col cols="4">
        <v-btn class="bg-main color-white">x</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  addon: {
    type: Object,
  },
});

const localAddon = reactive(props.addon);

watch(
  localAddon,
  async (newValue) => {
    localAddon.addonPrice = newValue.price * newValue.amount;
  },
  { immediate: true },
);
</script>
