import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        home: {
            path: '/'
        },
        hautarzt: {
            path: '/hautarzt'
        },
        vorteile: {
            path: '/vorteile'
        },
        faq: {
            path: '/faq'
        },
        about: {
            path: '/ueber-uns'
        },
        contact: {
            path: '/kontakt'
        },
        authorisation: {
            path: '/authorisation'
        },
        registrierung: {
            path: '/registrierung'
        },
        login: {
            path: '/login'
        },
        konditionen: {
            path: '/konditionen'
        },
        studien: {
            path: '/studien'
        },
        forschung: {
            path: '/forschung'
        },
        datenschutz: {
            path: '/datenschutz'
        },
        agb: {
            path: '/agb'
        },
        impressum: {
            path: '/impressum'
        },
        account: {
            path: '/account'
        },
        billing: {
            path: '/account/billing'
        },
        personalInformation: {
            path: '/account/personal-information'
        },
        enquiries: {
            path: '/enquiries'
        },
    }

    Vue.prototype.$routes = OPTIONS
    app.routes = OPTIONS
}