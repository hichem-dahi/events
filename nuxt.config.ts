// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["@/assets/main.css"],
  modules: ["nuxt-icons", "@pinia/nuxt", "@nuxt/test-utils/module"]    

})