import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        users: {
            path: '/users'
        },
    }
    
    Vue.prototype.$apiRoutes = OPTIONS
    app.apiRoutes = OPTIONS
}