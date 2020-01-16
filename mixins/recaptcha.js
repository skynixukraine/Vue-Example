import { load } from 'recaptcha-v3'

const DEFAULT_RECAPTCHA_INSTANCE = {}
const DEFAULT_RECAPTCHA_TOKEN = ''

export default {
    data() {
        return {
            recaptchaInstance:  DEFAULT_RECAPTCHA_INSTANCE,
            recaptchaToken: DEFAULT_RECAPTCHA_TOKEN,
        }
    },

    methods: {
        async loadAndSetRecaptchaToken(action) {
            this.recaptchaInstance = await load(process.env.RECAPTCHA_SITE_KEY)
            this.recaptchaToken = await this.recaptchaInstance.execute(action)
        },
    }
}