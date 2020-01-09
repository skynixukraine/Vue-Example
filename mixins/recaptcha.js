import RecaptchaApi from "~/services/api/Recaptcha"

const DEFAULT_RECAPTCHA_TOKEN = ''

export default {
    data() {
        return {
            recaptchaToken: DEFAULT_RECAPTCHA_TOKEN,
        }
    },
    beforeDestroy() {
        this.cleanRecaptchaToken()
    },
    methods: {
        async loadAndSetRecaptchaToken(actionName) {
            const token = await RecaptchaApi.loadRecaptchaToken(actionName)
            this.setRecaptchaToken(token)

            return token
        },
        setRecaptchaToken(token) {
            this.recaptchaToken = token
        },
        cleanRecaptchaToken() {
            this.recaptchaToken = DEFAULT_RECAPTCHA_TOKEN
        }
    },
}