<template>
    <v-container fluid class="h-50 pa-0" :style="{ backgroundImage: `url(${model.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <v-row class="h-100 pa-0 ma-0 d-flex">
            <v-col cols="6" style="background-color: rgba(0, 0, 0, 0.5)" class="w-100 h-100" :class="model.clases">
                <span class="text-white">{{ model.title }}</span>
            </v-col>
            <v-col cols="6" class="order-1">
                'hola'
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
