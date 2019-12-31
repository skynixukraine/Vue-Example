import configEnv from './configs/env'

module.exports = {
    head: {
        title: 'client',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
    },
    env: configEnv,
    css: [
        { src: "~/static/styles/fonts.css", lang: 'css' },
        { src: "~/static/styles/normalize.css", lang: 'css' }
    ],
    styleResources: {
        scss: [
            'assets/scss/main.scss'
        ]
    },
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/pwa'
    ],
    loading: { color: '#3B8070' },
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
        // Injections
        { src: '~/plugins/injections/routes' },
        { src: '~/plugins/injections/apiRoutes' },

        // 3rd Party Modules/Libs
        { src: '~/plugins/modules/recaptcha' },
        { src: '~/plugins/modules/axios' },
        { src: '~/plugins/modules/googleMaps' },
        { src: '~/plugins/modules/i18n' },
        { src: '~/plugins/modules/mq' },
        { src: '~/plugins/modules/telInput' },

        // Global components
        { src: '~/plugins/globalComponents/general' },
    ],
    build: {
        vendor: ['axios'],
        transpile: ['/^vue2-google-maps($|\/)/']
    }
}