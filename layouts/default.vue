<script setup lang="ts">
import NavBar from '~/components/general/NavBar.vue';
</script>

<template>
  <v-app>
    <general-nav-bar />
    <slot />
    <!-- FOOTER -->
  </v-app>
</template>
