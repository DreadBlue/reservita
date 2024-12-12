<template>
  <v-container fluid class="pa-0 h-100">
    <v-row class="h-100">
      <v-col cols="12" class="d-flex justify-center">
        <v-card
          class="v-col-11 bg-second color-white elevation-20"
          style="height: 60vh"
        >
          <div class="d-flex flex-column ga-3">
            <div v-for="item in items" class="bg-mywhite color-myblack rounded-lg pa-2 d-flex" :key="item.name">
              <v-icon :icon="item.icon" class="px-5"></v-icon>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
