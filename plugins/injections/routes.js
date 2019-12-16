import Vue from 'vue'

export default ({ app }, inject) => {
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
    app.routes = OPTIONS
}