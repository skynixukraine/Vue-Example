import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_workbox_5e824221 from 'nuxt_plugin_workbox_5e824221' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_routes_3558dcf2 from 'nuxt_plugin_routes_3558dcf2' // Source: ../plugins/injections/routes (mode: 'all')
import nuxt_plugin_apiRoutes_59ebfab2 from 'nuxt_plugin_apiRoutes_59ebfab2' // Source: ../plugins/injections/apiRoutes (mode: 'all')
import nuxt_plugin_googleApiRoutes_0f246e2e from 'nuxt_plugin_googleApiRoutes_0f246e2e' // Source: ../plugins/injections/googleApiRoutes (mode: 'all')
import nuxt_plugin_recaptchaActions_b0e367da from 'nuxt_plugin_recaptchaActions_b0e367da' // Source: ../plugins/injections/recaptchaActions (mode: 'all')
import nuxt_plugin_timeOfDay_2267f5d0 from 'nuxt_plugin_timeOfDay_2267f5d0' // Source: ../plugins/custom/timeOfDay (mode: 'all')
import nuxt_plugin_window_4bc45498 from 'nuxt_plugin_window_4bc45498' // Source: ../plugins/custom/window (mode: 'client')
import nuxt_plugin_localStorage_557342e4 from 'nuxt_plugin_localStorage_557342e4' // Source: ../plugins/modules/localStorage (mode: 'client')
import nuxt_plugin_recaptcha_02cad8ae from 'nuxt_plugin_recaptcha_02cad8ae' // Source: ../plugins/modules/recaptcha (mode: 'client')
import nuxt_plugin_axios_3fa3ac38 from 'nuxt_plugin_axios_3fa3ac38' // Source: ../plugins/modules/axios (mode: 'all')
import nuxt_plugin_googleMaps_347efdee from 'nuxt_plugin_googleMaps_347efdee' // Source: ../plugins/modules/googleMaps (mode: 'all')
import nuxt_plugin_i18n_3df04bc8 from 'nuxt_plugin_i18n_3df04bc8' // Source: ../plugins/modules/i18n (mode: 'all')
import nuxt_plugin_telInput_d9269d26 from 'nuxt_plugin_telInput_d9269d26' // Source: ../plugins/modules/telInput (mode: 'all')
import nuxt_plugin_modals_6e6a9838 from 'nuxt_plugin_modals_6e6a9838' // Source: ../plugins/modules/modals (mode: 'all')
import nuxt_plugin_general_6849ad30 from 'nuxt_plugin_general_6849ad30' // Source: ../plugins/globalComponents/general (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error('inject(key, value) has no value provided')
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_5e824221 === 'function') {
    await nuxt_plugin_workbox_5e824221(app.context, inject)
  }

  if (typeof nuxt_plugin_routes_3558dcf2 === 'function') {
    await nuxt_plugin_routes_3558dcf2(app.context, inject)
  }

  if (typeof nuxt_plugin_apiRoutes_59ebfab2 === 'function') {
    await nuxt_plugin_apiRoutes_59ebfab2(app.context, inject)
  }

  if (typeof nuxt_plugin_googleApiRoutes_0f246e2e === 'function') {
    await nuxt_plugin_googleApiRoutes_0f246e2e(app.context, inject)
  }

  if (typeof nuxt_plugin_recaptchaActions_b0e367da === 'function') {
    await nuxt_plugin_recaptchaActions_b0e367da(app.context, inject)
  }

  if (typeof nuxt_plugin_timeOfDay_2267f5d0 === 'function') {
    await nuxt_plugin_timeOfDay_2267f5d0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_window_4bc45498 === 'function') {
    await nuxt_plugin_window_4bc45498(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_localStorage_557342e4 === 'function') {
    await nuxt_plugin_localStorage_557342e4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_recaptcha_02cad8ae === 'function') {
    await nuxt_plugin_recaptcha_02cad8ae(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3fa3ac38 === 'function') {
    await nuxt_plugin_axios_3fa3ac38(app.context, inject)
  }

  if (typeof nuxt_plugin_googleMaps_347efdee === 'function') {
    await nuxt_plugin_googleMaps_347efdee(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_3df04bc8 === 'function') {
    await nuxt_plugin_i18n_3df04bc8(app.context, inject)
  }

  if (typeof nuxt_plugin_telInput_d9269d26 === 'function') {
    await nuxt_plugin_telInput_d9269d26(app.context, inject)
  }

  if (typeof nuxt_plugin_modals_6e6a9838 === 'function') {
    await nuxt_plugin_modals_6e6a9838(app.context, inject)
  }

  if (typeof nuxt_plugin_general_6849ad30 === 'function') {
    await nuxt_plugin_general_6849ad30(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
