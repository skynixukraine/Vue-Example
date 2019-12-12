import Vue from 'vue'

const OPTIONS = {
    home: {
        path: '/'
    },
    dermatologists: {
        path: '/dermatologists'
    },
    advantages: {
        path: '/advantages',
    },
    faq: {
        path: '/faq',
    },
    about: {
        path: '/about',
    },
    jobs: {
        path: '/jobs',
    },
}

Vue.prototype.$routes = OPTIONS