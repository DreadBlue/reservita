<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          :disabled="loading"
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
        >
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="item.foto" cover></v-img>

          <v-card-item>
            <v-card-title>{{ item.nombre }}</v-card-title>

            <v-card-subtitle>
              <span class="me-1">{{ item.role }}</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-text>
            <div class="text-subtitle-2">{{ item.profesion }}</div>
            <!-- <div class="text-subtitle-2">Guía profesional de Canyoning</div> -->
            <div class="mt-3">
              {{ item.descripcion }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const loading = ref(false);
</script>
