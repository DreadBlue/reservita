import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "no-undef": "off",  
      // "vue/no-unused-vars": "warn",  // Changes unused vars from error to warning
      // Add more rules as needed
      "vue/multi-word-component-names": "off",
    }
  }
];