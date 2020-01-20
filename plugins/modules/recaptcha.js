import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const OPTIONS = {
    siteKey: process.env.RECAPTCHA_SITE_KEY
}

Vue.use(VueReCaptcha, OPTIONS)