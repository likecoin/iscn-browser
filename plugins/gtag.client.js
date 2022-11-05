import Vue from 'vue' // eslint-disable-line import/no-extraneous-dependencies
import VueGtag from 'vue-gtag'

export default (ctx, inject) => {
  const {
    app: { router },
  } = ctx
  Vue.use(
    VueGtag,
    {
      config: { id: 'G-E8Q9GGZHNY' },
      bootstrap: !(window.doNotTrack || navigator.doNotTrack),
    },
    router
  )
  ctx.$gtag = Vue.$gtag
  inject('gtag', Vue.$gtag)
}
