<template>
    <v-container fluid class="pa-0" :style="{ backgroundImage: `url(${model.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <v-row class="h-100 pa-0 ma-0 d-flex">
            <v-col cols="12" sm="6" style="background-color: rgba(0, 0, 0, 0.5)" class="w-100 h-100 d-flex flex-column justify-center ga-3 py-15" :class="model.clases">
                <p class="color-white text-sm-h3 text-h4 text-center mt-2">{{ model.title }}</p>
                <p class="text-white text-sm-body-1 text-body-2 px-10 text-center">{{ model.description }}</p>
                <div class="d-flex justify-center ga-10 mt-5">
                    <div v-for="item in model.icon" class="d-flex flex-column color-white align-center" :key="item.icon">
                        <v-icon size="80" :icon="item.icon"></v-icon>
                        <p class="text-body-2">{{ item.text }}</p>
                    </div>
                </div>
                <p class="text-white text-body-2 text-center">{{$t('timerDisclaimer')}}</p>
                <div class="d-flex justify-center">
                    <v-btn @click="useBooking.updateDetails({showModal: true})" class="bg-mywhite color-main w-25">{{$t('reservarCap')}}</v-btn>
                </div>
            </v-col>
            <v-col cols="6" class="order-1 d-sm-flex d-none">
                <div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useBookingStore } from '/stores/booking.js';

defineProps({
    model: {
        type: Object,
        required: true,
    },
});

const useBooking = useBookingStore();
</script>
