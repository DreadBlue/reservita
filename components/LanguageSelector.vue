<template>
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn class="bg-main color-white" v-bind="props"> LANG </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="setLanguage(item.title)" >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const { setLocale } = useI18n();
    return {setLocale};
  },
  data: () => ({
    items: [{ title: "es" }, { title: "en" }, { title: "it" }],
  }),
  methods: {
    setLanguage(lang) {
        localStorage.setItem('setLanguage', true);
        this.setLocale(lang)
    }
  }
};
</script>
