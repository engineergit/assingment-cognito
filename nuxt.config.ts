// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      title: 'Account',
      titleTemplate: '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, minimum-scale=1'
        },
        { name: 'description', content: '', key: 'description' }
      ],
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap'
        }
      ]
    }
  },
  imports: {
    autoImport: true,
    imports: [{ from: 'vue', name: 'PropType', type: true }]
  },
  pages: true,
  build: {
    transpile: ['vuetify']
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
    'nuxt-security',
    '@sidebase/nuxt-auth'
  ],
  css: [`~/assets/scss/main.scss`, 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**']
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs'
    }
  },
  runtimeConfig: {}
});
