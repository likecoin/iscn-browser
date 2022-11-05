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
    title: 'ISCN Browser - powered by LikeCoin',
    descrption: 'Search, browse and edit ISCN records stored on LikeCoin chain',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Search, browse and edit ISCN records stored on LikeCoin chain' },
      { hid: 'og:title', property: 'og:title', content: 'ISCN Browser - powered by LikeCoin' },
      { hid: 'og:description', property: 'og:description', content: 'Search, browse and edit ISCN records stored on LikeCoin chain' },
      { hid: 'og:image', property: 'og:image', content: 'https://iscn.io/images/logo-white.png' },
      { hid: 'theme-color', name: 'theme-color', content: '#28646e' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@likecoin/wallet-connector/dist/style.css', lang: 'css' },
    '~/assets/css/index',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/gtag.client.js', mode: 'client' },
  ],

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
