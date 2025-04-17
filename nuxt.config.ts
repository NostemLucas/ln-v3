// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  devServer: {
    port: 8080,
  },
  colorMode: {
    classPrefix: "theme",
    fallback: "light",
    preference: "light",
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  icon: {
    collections: ["lucide", "svg-spinners", "mdi"],
    size: "1.253em",
  },
  plugins: [{ src: "~/plugins/drag-scroll", ssr: false }],
});
