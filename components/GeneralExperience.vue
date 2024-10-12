<template>
  <v-container fluid class="py-15">
    <v-row style="height: 500px" class="d-flex">
      <v-col cols="6" class="image-wrapper" :class="experience.order">
        <div>
          <img :src="experience.srcBack" alt="rappel" class="background-image" :style="{ left: styleItem.backgroundLeft }" />
        </div>
        <div>
            <img
            :src="experience.srcOverlay"
            alt="canyoning"
            class="overlay-image"
            />
        </div>
    </v-col>
    <v-col cols="6">
        <v-row>
            <v-col cols="12" class="d-flex flex-column">
                <v-divider :thickness="7" class="mb-3 color-main" style="margin-right: 480px; opacity: 1;"></v-divider>
                <p>{{experience.subtitle}}</p>
                {{ item.backgroundLeft }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-sm-h3 color-main">{{ experience.title }}</p>
            <p class="text-sm-body-1 ml-8 mt-4">
                {{ experience.descripcion }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-15 bg-main">
        <general-banner-cards :items="bannerCards"/>
    </v-row>
    <v-row>
        <activity-banner-icons :model="bannerIcons"/>
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
 
const experience = props.item.main;
const bannerCards = props.item.activities;
const bannerIcons = props.item.third;
const styleItem = props.item.style;

</script>

<style scoped>
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-image {
  position: absolute;
  top: 0;
  width: 45%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.overlay-image {
  position: absolute;
  top: 75%;
  left: 55%;
  width: 55%;
  height: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 2;
}
</style>
