import { HTTP } from '~/plugins/modules/axios'
import Vue from 'vue'

const googleApiRoutes = Vue.prototype.$googleApiRoutes

export default {

    async loadVerifyForSite(token) {
        const response = await HTTP.post(googleApiRoutes.siteverify.path, {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: token,
        })
        
        return response
    },
}