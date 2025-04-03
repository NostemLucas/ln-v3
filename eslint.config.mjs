// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.ts", "**/*.vue", "**/*.js"],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "off",

    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": "off",
    "vue/attributes-order": "off",
  },
});
