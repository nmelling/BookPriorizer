// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/a11y', '@pinia/nuxt'],
  a11y: {
     enabled: true,
     defaultHighlight: true,
     logIssues: true,
     axe: {
       options: {},
       runOptions: {},
     },
   },
})
