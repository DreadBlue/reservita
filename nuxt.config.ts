// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    firebase: {
      gen: 2
    }
  },
  devtools: { enabled: true },
  app: { 
    head: {
      title: 'La reservita',
      link: [{
        rel: "icon", href: "/logo.ico", type:"image/x-icon"
      }],
      script:[
       {
        src:"https://checkout.epayco.co/checkout.js",
       },
       {
        src:"https://www.google.com/recaptcha/enterprise.js?render=6Le7mVoqAAAAAKoRUSkv7Yc4KnconJJsP2HcmZqJ",
       }
      ],
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/lib/styles/main.sass'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'dayjs-nuxt',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2024-10-01',
})