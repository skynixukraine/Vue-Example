import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        siteverify: {
            path: `${process.env.GOOGLE_API_RECAPTCHA_URL}/siteverify`
        },
    }
    
    Vue.prototype.$googleApiRoutes = OPTIONS
    app.googleApiRoutes = OPTIONS
}