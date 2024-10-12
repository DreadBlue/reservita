<template>
    <v-container fluid :class="items.one.backgroundColor">
        <v-row>
            <v-col cols="12" class="d-flex flex-column align-center color-white">
                <p class="text-h3 mt-4">ACTIVIDADES</p>
                <p style="font-style: italic;">"{{ items.one.subtitle }}"</p>
            </v-col>
        </v-row>
        <v-row class="d-flex ma-sm-15 ma-4 justify-space-evenly">
            <v-col v-for="activity in items" :key="activity.id" cols="10" sm="3" :style="{ backgroundImage: `url(${activity.src})`, height: 'auto', backgroundSize: 'cover' }" class="color-white rounded-lg my-5">
                <div class="pa-sm-10 pa-3">
                    <p class="text-subtitle-1 my-5">{{ activity.title }}</p>
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
