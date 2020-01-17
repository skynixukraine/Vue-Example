export default {
    data() {
        return {
            recaptchaToken: ''
        }
    },

    methods: {
        loadAndSetRecaptchaToken(action) {
            grecaptcha.ready(() => {
                grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY, { action }).then((token) => {
                    this.recaptchaToken = token
                })
            })
        }
    }
}