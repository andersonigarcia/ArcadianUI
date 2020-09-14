import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// import { Cookies } from 'quasar'
// import urls from './urls'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // exige autenticacao em todas as rotas
  // Router.beforeEach((to, from, next) => {
  //   if (urls.knownUrls.indexOf(to.fullPath) > -1) {
  //     next(false)
  //     return urls.navigateTo(to.fullPath)
  //   }

  //   const isAuthenticated = Cookies.has(urls.cookieName)
  //   if (isAuthenticated) return next()

  //   urls.navigateTo(urls.singIn)
  // })

  return Router
}
