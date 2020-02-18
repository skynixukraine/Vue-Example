// configs
import configServer from './configs/server'
import configEnv from './configs/env'

module.exports = {
    server: configServer,
    env: configEnv,
    head: {
        title: 'client',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' },
        ],
        script: [
            { src: `https://www.google.com/recaptcha/api.js?render=6LdevsYUAAAAANMMWGDy7h5SPUc9knsvAwe-28bI` },
            { src: `https://maps.googleapis.com/maps/api/js?key=${configEnv.GOOGLE_MAPS_API_KEY}&libraries=places` },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
    },
    css: [
        { src: "~/static/styles/fonts.css", lang: 'css' },
        { src: "~/static/styles/normalize.css", lang: 'css' },
        { src: "~/static/styles/modal.css", lang: 'css' },
    ],
    styleResources: {
        scss: [
            'assets/scss/main.scss',
        ]
    },
    modules: [
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        '@nuxtjs/pwa',
    ],
    loading: { color: '#FFF' },
    manifest: {
        name: 'Nuxt Hacker News',
        short_name: 'Nuxt HN',
        description: 'HackerNews clone built with Nuxt.js',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#2F495E',
        lang: 'de',
    },
    router: {},
    plugins: [
        { src: '~/plugins/injections/cookie' },
        { src: '~/plugins/injections/routes' },
        { src: '~/plugins/injections/apiRoutes' },
        { src: '~/plugins/injections/googleApiRoutes' },
        { src: '~/plugins/injections/recaptchaActions' },
        { src: '~/plugins/injections/modals' },

        { src: '~/plugins/custom/timeOfDay' },
        { src: '~/plugins/custom/window', mode: 'client' },

        { src: '~plugins/modules/vuexSharedMutations', mode: 'client' },
        { src: '~/plugins/modules/recaptcha', mode: 'client' },
        { src: '~/plugins/modules/axios' },
        { src: '~/plugins/modules/googleMaps' },
        { src: '~/plugins/modules/i18n' },
        { src: '~/plugins/modules/telInput' },
        { src: '~/plugins/modules/modals' },

        { src: '~/plugins/globalComponents/general' },
    ],
    build: {
        vendor: ['axios'],
        transpile: ['/^vue2-google-maps($|\/)/'],
    }
}