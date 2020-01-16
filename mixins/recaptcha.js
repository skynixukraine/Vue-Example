import { load } from 'recaptcha-v3'

const DEFAULT_RECAPTCHA_INSTANCE = {}
const DEFAULT_RECAPTCHA_TOKEN = ''

export default {
    data() {
        return {
            recaptchaToken: DEFAULT_RECAPTCHA_TOKEN,
        }
    },

    methods: {
        async loadAndSetRecaptchaToken(action) {
            const recaptcha = await load(process.env.RECAPTCHA_SITE_KEY)
            this.recaptchaToken = await recaptcha.execute(action)
        },
    }
}