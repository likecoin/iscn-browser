import { INDEXER, BASE_PATH, isDev } from './config.js'
if (isDev) { process.env.DEBUG = 'nuxt:*' }
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr: false,
  router: {
    base: BASE_PATH,
  },
  generate: {
    fallback: '404.html',
  },
  head: {
    title: 'iscn-browser',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@likecoin/wallet-connector/dist/style.css', lang: 'css' },
    '~/assets/css/index',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'https://like.wancat.cc',
    baseURL: INDEXER,
    // proxy: true,
  },
  proxy: [
    'http://127.0.0.1:8997/iscn/records',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
