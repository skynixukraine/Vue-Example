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
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=EB+Garamond:400,400i,500,500i,600,600i,700,700i,800,800i|Fira+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap&subset=cyrillic' }
        ]
    },
    modules: [
        '@nuxtjs/style-resources'
    ],
    styleResources: {
        scss: [
            'assets/scss/main.scss'
        ]
    },
    loading: { color: '#3B8070' },
    router: {},
    plugins: [
        // 3rd Party Modules/Libs
        { src: '~/plugins/modules/axios' },
        { src: '~/plugins/modules/i18n' },
        { src: '~/plugins/modules/mq' },

        // Global components
        { src: '~/plugins/globalComponents/general' },
    ],
    build: {
        vendor: [
            'axios',
        ],
    }
}