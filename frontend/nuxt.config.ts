// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import i18n from '@nuxtjs/i18n'

export default defineNuxtConfig({
  css: ['~/assets/styles/global.scss'],
  build: {
    transpile: ['vuetify'],
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
  },
  modules: [
    '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  i18n: {
    defaultLocale: "ru",
    locales: [
      { code: "ru", name: "Рус", file: 'locales/ru.json' },
      { code: "en", name: "Eng", file: 'locales/en.json' },
    ],
    lazy: true,
    langDir: '',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: true,
})
