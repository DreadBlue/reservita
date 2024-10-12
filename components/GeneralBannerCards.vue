<template>
    <v-container fluid :class="items.one.backgroundColor">
        <v-row>
            <v-col cols="12" class="d-flex flex-column align-center color-white">
                <p class="text-sm-h3 mt-4">ACTIVIDADES</p>
                <p style="font-style: italic;">"{{ items.one.subtitle }}"</p>
            </v-col>
        </v-row>
        <v-row class="d-flex ma-15 justify-space-evenly">
            <v-col v-for="activity in items" :key="activity.id" cols="3" :style="{ backgroundImage: `url(${activity.src})`, height: '400px', backgroundSize: 'cover' }" class="color-white">
                <div class="pa-10">
                    <p class="text-sm-subtitle-1 my-5">{{ activity.title }}</p>
                    <p class="text-sm-body-2">{{ activity.description }}</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
defineProps({
    items: {
        type: Object,
        required: true,
    }
})
</script>
