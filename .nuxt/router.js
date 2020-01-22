import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ebf4ec52 = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _380b4166 = () => interopDefault(import('../pages/agb/index.vue' /* webpackChunkName: "pages/agb/index" */))
const _2630ddbe = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _f9064466 = () => interopDefault(import('../pages/datenschutz/index.vue' /* webpackChunkName: "pages/datenschutz/index" */))
const _b32a60ea = () => interopDefault(import('../pages/enquiries/index.vue' /* webpackChunkName: "pages/enquiries/index" */))
const _6bd6fb00 = () => interopDefault(import('../pages/faq/index.vue' /* webpackChunkName: "pages/faq/index" */))
const _51099549 = () => interopDefault(import('../pages/forschung/index.vue' /* webpackChunkName: "pages/forschung/index" */))
const _12501622 = () => interopDefault(import('../pages/hautarzt/index.vue' /* webpackChunkName: "pages/hautarzt/index" */))
const _2720f83e = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _da972b14 = () => interopDefault(import('../pages/konditionen/index.vue' /* webpackChunkName: "pages/konditionen/index" */))
const _6020a9ec = () => interopDefault(import('../pages/kontakt/index.vue' /* webpackChunkName: "pages/kontakt/index" */))
const _7aad74be = () => interopDefault(import('../pages/registrierung/index.vue' /* webpackChunkName: "pages/registrierung/index" */))
const _46653ce8 = () => interopDefault(import('../pages/studien/index.vue' /* webpackChunkName: "pages/studien/index" */))
const _ff9ec954 = () => interopDefault(import('../pages/ueber-uns/index.vue' /* webpackChunkName: "pages/ueber-uns/index" */))
const _37e52cb6 = () => interopDefault(import('../pages/verify/index.vue' /* webpackChunkName: "pages/verify/index" */))
const _7b254484 = () => interopDefault(import('../pages/vorteile/index.vue' /* webpackChunkName: "pages/vorteile/index" */))
const _113dd37a = () => interopDefault(import('../pages/account/billing/index.vue' /* webpackChunkName: "pages/account/billing/index" */))
const _1380082d = () => interopDefault(import('../pages/account/personal-information/index.vue' /* webpackChunkName: "pages/account/personal-information/index" */))
const _06258e9a = () => interopDefault(import('../pages/enquiries/_id.vue' /* webpackChunkName: "pages/enquiries/_id" */))
const _56e7bd68 = () => interopDefault(import('../pages/faq/_id.vue' /* webpackChunkName: "pages/faq/_id" */))
const _81a6e38e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
    component: _ebf4ec52,
    name: "account"
  }, {
    path: "/agb",
    component: _380b4166,
    name: "agb"
  }, {
    path: "/dashboard",
    component: _2630ddbe,
    name: "dashboard"
  }, {
    path: "/datenschutz",
    component: _f9064466,
    name: "datenschutz"
  }, {
    path: "/enquiries",
    component: _b32a60ea,
    name: "enquiries"
  }, {
    path: "/faq",
    component: _6bd6fb00,
    name: "faq"
  }, {
    path: "/forschung",
    component: _51099549,
    name: "forschung"
  }, {
    path: "/hautarzt",
    component: _12501622,
    name: "hautarzt"
  }, {
    path: "/impressum",
    component: _2720f83e,
    name: "impressum"
  }, {
    path: "/konditionen",
    component: _da972b14,
    name: "konditionen"
  }, {
    path: "/kontakt",
    component: _6020a9ec,
    name: "kontakt"
  }, {
    path: "/registrierung",
    component: _7aad74be,
    name: "registrierung"
  }, {
    path: "/studien",
    component: _46653ce8,
    name: "studien"
  }, {
    path: "/ueber-uns",
    component: _ff9ec954,
    name: "ueber-uns"
  }, {
    path: "/verify",
    component: _37e52cb6,
    name: "verify"
  }, {
    path: "/vorteile",
    component: _7b254484,
    name: "vorteile"
  }, {
    path: "/account/billing",
    component: _113dd37a,
    name: "account-billing"
  }, {
    path: "/account/personal-information",
    component: _1380082d,
    name: "account-personal-information"
  }, {
    path: "/enquiries/:id",
    component: _06258e9a,
    name: "enquiries-id"
  }, {
    path: "/faq/:id",
    component: _56e7bd68,
    name: "faq-id"
  }, {
    path: "/",
    component: _81a6e38e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
