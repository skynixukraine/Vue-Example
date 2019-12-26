import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        register: {
            path: '/register'
        },
        users: {
            path: '/doctors'
        },
    }
    
    Vue.prototype.$apiRoutes = OPTIONS
    app.apiRoutes = OPTIONS
}