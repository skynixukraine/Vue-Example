import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ebf4ec52 = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _5ee659e3 = () => interopDefault(import('../pages/authorization/index.vue' /* webpackChunkName: "pages/authorization/index" */))
const _2630ddbe = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _b32a60ea = () => interopDefault(import('../pages/enquiries/index.vue' /* webpackChunkName: "pages/enquiries/index" */))
const _6bd6fb00 = () => interopDefault(import('../pages/faq/index.vue' /* webpackChunkName: "pages/faq/index" */))
const _37e52cb6 = () => interopDefault(import('../pages/verify/index.vue' /* webpackChunkName: "pages/verify/index" */))
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
    path: "/authorization",
    component: _5ee659e3,
    name: "authorization"
  }, {
    path: "/dashboard",
    component: _2630ddbe,
    name: "dashboard"
  }, {
    path: "/enquiries",
    component: _b32a60ea,
    name: "enquiries"
  }, {
    path: "/faq",
    component: _6bd6fb00,
    name: "faq"
  }, {
    path: "/verify",
    component: _37e52cb6,
    name: "verify"
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
