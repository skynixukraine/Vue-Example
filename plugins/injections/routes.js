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
        account: {
            path: '/account'
        },
        accountPersonalInformation: {
            path: '/account/personal-information'
        },
        accountBilling: {
            path: '/account/billing'
        },
        enquiries: {
            path: '/enquiries'
        },
        dashboard: {
            path: '/dashboard'
        },
        authorisation: {
            path: '/authorisation'
        },
    }
    
    Vue.prototype.$routes = OPTIONS
    app.routes = OPTIONS
}