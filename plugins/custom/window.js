import Vue from 'vue'

// options

export default ({ app }, inject) => {
    Vue.prototype.$window = 'test'
    app.window = 'test'
}