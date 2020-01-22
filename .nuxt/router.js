import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _761c664f = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _253319de = () => interopDefault(import('../pages/agb/index.vue' /* webpackChunkName: "pages/agb/index" */))
const _68027c36 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _d13e8376 = () => interopDefault(import('../pages/datenschutz/index.vue' /* webpackChunkName: "pages/datenschutz/index" */))
const _2f8723fa = () => interopDefault(import('../pages/enquiries/index.vue' /* webpackChunkName: "pages/enquiries/index" */))
const _58fed378 = () => interopDefault(import('../pages/faq/index.vue' /* webpackChunkName: "pages/faq/index" */))
const _da49987e = () => interopDefault(import('../pages/forschung/index.vue' /* webpackChunkName: "pages/forschung/index" */))
const _e4c6b112 = () => interopDefault(import('../pages/hautarzt/index.vue' /* webpackChunkName: "pages/hautarzt/index" */))
const _2e412259 = () => interopDefault(import('../pages/impressum/index.vue' /* webpackChunkName: "pages/impressum/index" */))
const _b2cf6a24 = () => interopDefault(import('../pages/konditionen/index.vue' /* webpackChunkName: "pages/konditionen/index" */))
const _87f2f0fc = () => interopDefault(import('../pages/kontakt/index.vue' /* webpackChunkName: "pages/kontakt/index" */))
const _ed03d36a = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _251b1736 = () => interopDefault(import('../pages/registrierung/index.vue' /* webpackChunkName: "pages/registrierung/index" */))
const _6e3783f8 = () => interopDefault(import('../pages/studien/index.vue' /* webpackChunkName: "pages/studien/index" */))
const _7bfb8c64 = () => interopDefault(import('../pages/ueber-uns/index.vue' /* webpackChunkName: "pages/ueber-uns/index" */))
const _1825c3a6 = () => interopDefault(import('../pages/verify/index.vue' /* webpackChunkName: "pages/verify/index" */))
const _11e9f70c = () => interopDefault(import('../pages/vorteile/index.vue' /* webpackChunkName: "pages/vorteile/index" */))
const _86200a8a = () => interopDefault(import('../pages/account/billing/index.vue' /* webpackChunkName: "pages/account/billing/index" */))
const _a78bb296 = () => interopDefault(import('../pages/account/personal-information/index.vue' /* webpackChunkName: "pages/account/personal-information/index" */))
const _2df7d5aa = () => interopDefault(import('../pages/enquiries/_id.vue' /* webpackChunkName: "pages/enquiries/_id" */))
const _629b53e0 = () => interopDefault(import('../pages/faq/_id.vue' /* webpackChunkName: "pages/faq/_id" */))
const _15793a9e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _761c664f,
    name: "account"
  }, {
    path: "/agb",
    component: _253319de,
    name: "agb"
  }, {
    path: "/dashboard",
    component: _68027c36,
    name: "dashboard"
  }, {
    path: "/datenschutz",
    component: _d13e8376,
    name: "datenschutz"
  }, {
    path: "/enquiries",
    component: _2f8723fa,
    name: "enquiries"
  }, {
    path: "/faq",
    component: _58fed378,
    name: "faq"
  }, {
    path: "/forschung",
    component: _da49987e,
    name: "forschung"
  }, {
    path: "/hautarzt",
    component: _e4c6b112,
    name: "hautarzt"
  }, {
    path: "/impressum",
    component: _2e412259,
    name: "impressum"
  }, {
    path: "/konditionen",
    component: _b2cf6a24,
    name: "konditionen"
  }, {
    path: "/kontakt",
    component: _87f2f0fc,
    name: "kontakt"
  }, {
    path: "/login",
    component: _ed03d36a,
    name: "login"
  }, {
    path: "/registrierung",
    component: _251b1736,
    name: "registrierung"
  }, {
    path: "/studien",
    component: _6e3783f8,
    name: "studien"
  }, {
    path: "/ueber-uns",
    component: _7bfb8c64,
    name: "ueber-uns"
  }, {
    path: "/verify",
    component: _1825c3a6,
    name: "verify"
  }, {
    path: "/vorteile",
    component: _11e9f70c,
    name: "vorteile"
  }, {
    path: "/account/billing",
    component: _86200a8a,
    name: "account-billing"
  }, {
    path: "/account/personal-information",
    component: _a78bb296,
    name: "account-personal-information"
  }, {
    path: "/enquiries/:id",
    component: _2df7d5aa,
    name: "enquiries-id"
  }, {
    path: "/faq/:id",
    component: _629b53e0,
    name: "faq-id"
  }, {
    path: "/",
    component: _15793a9e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
