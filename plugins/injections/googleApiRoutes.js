import Vue from 'vue'

const recaptchaUrl = process.env.GOOGLE_API_RECAPTCHA_URL

export default ({ app }, inject) => {
    const OPTIONS = {
        siteverify: {
            path: `${recaptchaUrl}/siteverify`
        },
    }
    
    Vue.prototype.$googleApiRoutes = OPTIONS
    app.googleApiRoutes = OPTIONS
}