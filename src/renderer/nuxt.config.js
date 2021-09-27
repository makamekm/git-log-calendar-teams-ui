module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'Git Activity Tracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, target-densityDpi=device-dpi' }
    ]
  },
  loading: false,
  plugins: [
    '~/plugins/portal.js',
    '~/plugins/screen-size.js',
    '~/plugins/vuex-persist'
    // { src: '~/plugins/vuex-persist', ssr: false }
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios',
    'vue-toastification/nuxt'
  ]
}
