<template>
  <v-app>
    <general-nav-bar />
    <language-selector class="top-right"/>
    <slot />
    <general-footer />
  </v-app>
</template>

<script setup lang="js">
import { useI18n } from 'vue-i18n';

const { setLocale } = useI18n();
const userLang = navigator.language;
const setLanguage = localStorage.getItem('setLanguage');

if(userLang.includes('es') && setLanguage == false) {
  setLocale('es');
} else if (userLang.includes('it') && setLanguage == false) {
  setLocale('it');
} else if (setLanguage == false) {
  setLocale('en');
};
</script>

<style scoped>
.top-right {
  position: fixed;
  top: 83%;
  right: 0;
  margin: 8px;
  z-index: 10000;
}
</style>