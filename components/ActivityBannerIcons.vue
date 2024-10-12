<template>
    <v-container fluid class="bg-mywhite" style="height: auto;">
        <v-row>
            <v-col cols="12" class="d-flex ">
                <div v-for="item in model" class="d-flex flex-column text-center align-center justify-space-around w-100 mt-15">
                    <v-icon :icon="item.icon" size="100px"></v-icon>
                    <p class="text-sm-h6">{{ item.text }}</p>
                    <p class="text-sm-body-2 mx-10">{{ item.parrafo }}</p>
                </div>
            </v-col>
        </v-row>
        <v-row class="d-flex mt-10">
            <v-col cols="6" class="d-flex flex-column align-center">
                <p class="text-sm-h5 my-4">INCLUYE</p>
                <div v-for="item in model.third.incluye" class="d-flex align-center my-1 ga-2">
                    <v-icon :icon="item.icon" size="40"></v-icon>
                    <p class="text-sm-body-2">{{ item.text }}</p>
                </div>
            </v-col>
            <v-col cols="6" class="d-flex flex-column align-center">
                <p class="text-sm-h5 my-4">REQUISITOS</p>
                <div v-for="item in model.third.requisitos" class="d-flex align-center my-1 ga-2">
                    <v-icon :icon="item.icon" size="40"></v-icon>
                    <p class="text-sm-body-2">{{ item.text }}</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
defineProps({
    model: {
        type: Object,
        required: true,
    }
})
</script>