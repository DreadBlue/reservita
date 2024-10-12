<template>
  <v-container fluid class="py-7">
    <v-row style="height: 580px" class="d-flex">
      <v-col cols="6" :class="item.order">
        <div class="w-100 h-100">
          <img :src="item.src" alt="rappel" class="h-100 w-100 rounded-xl" />
        </div>
      </v-col>
      <v-col cols="6" class="d-flex align-center">
        <v-row>
          <v-col cols="12">
            <p class="text-sm-h3 color-main">{{ item.actividad }}</p>
            <v-divider
              :thickness="5"
              class="mb-3 color-main"
              style="margin-right: 480px; opacity: 1; margin-left: 50px"
            ></v-divider>
            <p class="text-sm-body-1 ml-8 mt-4">
              {{ item.descripcion }}
            </p>
          </v-col>
            <v-col cols="12" class="d-flex justify-center ga-10 mt-5">
              <div
                v-for="item in item.icon"
                class="d-flex flex-column color-second align-center"
              >
                <v-icon size="80" :icon="item.icon"></v-icon>
                <p class="text-body-2">{{ item.text }}</p>
              </div>
            </v-col>
            <v-col cols="5" class="d-flex flex-column ml-12 mt-5">
              <div v-for="precio in item.precio" :key="precio">
                {{ precio }}
              </div>
            </v-col>
            <v-col cols="5" class="d-flex align-center justify-end">
              <v-btn class="bg-second color-white">RESERVAR</v-btn>
            </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
