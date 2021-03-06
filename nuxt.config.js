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
            { hid: 'description', name: 'description', content: 'Bei Online Hautarzt vor Ort erhalten Sie schnell, online und kostengünstig (19,- €) eine professionelle Einschätzung Ihres Hautproblems durch einen Hautarzt aus Deutschland. Dank der ärztlichen Empfehlung wissen Sie zudem, was Sie dagegen tun können.' },
            { name: 'msapplication-TileColor', content: '#ffffff' },
            { name: 'msapplication-TileImage', content: '/favicon512x512.png' },
            { hid: 'og:image', property: 'og:image', name: 'og:image', content: '/prevImg.jpg'},
        ],
        script: [
            { src: `https://js.stripe.com/v3/` },
            { src: `https://www.google.com/recaptcha/api.js?render=6LdevsYUAAAAANMMWGDy7h5SPUc9knsvAwe-28bI` },
            { innerHTML: `
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:1841225,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            ` },
        ],
        __dangerouslyDisableSanitizers: ['script'],

        link: [
            { rel: 'shortcut icon', type: 'image/x-icon', sizes: "72x72", href: '/favicon72x72.png' },
            { rel: 'icon', type: 'image/x-icon', sizes: "72x72", href: '/favicon.ico' },
            { rel: 'icon', type: 'image/x-icon', sizes: "96X96", href: '/favicon96x96.png' },
            { rel: 'icon', type: 'image/x-icon', sizes: "128x128", href: '/favicon128x128.png' },
            { rel: 'icon', type: 'image/x-icon', sizes: "152x152", href: '/favicon152x152.png' },
            { rel: 'icon', type: 'image/x-icon', sizes: "192x192", href: '/favicon192x192.png' },
            { rel: 'icon', type: 'image/x-icon', sizes: "384x384", href: '/favicon384x384.png' },
            { rel: 'icon', type: 'image/x-icon', sizes: "512x512", href: '/favicon512x512.png' },
            { rel: 'shortcut icon', type: 'image/x-icon', sizes: "72x72", href: '/favicon72x72.png' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', sizes: "96X96", href: '/favicon96x96.png' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', sizes: "128x128", href: '/favicon128x128.png' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', sizes: "152x152", href: '/favicon152x152.png' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', sizes: "192x192", href: '/favicon192x192.png' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', sizes: "384x384", href: '/favicon384x384.png' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', sizes: "512x512", href: '/favicon512x512.png' },
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
        name: 'Hautprobleme? | Hautarzt online fragen | Zuhause bleiben‎',
        short_name: 'Hautarzt online fragen',
        description: 'Bei Online Hautarzt vor Ort erhalten Sie schnell, online und kostengünstig (19,- €) eine professionelle Einschätzung Ihres Hautproblems durch einen Hautarzt aus Deutschland. Dank der ärztlichen Empfehlung wissen Sie zudem, was Sie dagegen tun können.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#2F495E',
        lang: 'de',
    },
    router: {
        middleware: "route_switch_pages"
    },
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