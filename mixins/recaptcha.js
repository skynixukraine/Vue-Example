import RecaptchaApi from '../services/googleApi/Recaptcha'

export default {
    data() {
        return {
            recaptchaToken: '',
            isTokenVerify: false,
        }
    },
    methods: {
        async getRecaptchaToken() {
            await this.$recaptchaLoaded()
                .catch((e) => {
                    throw new Error('Failed to load recaptcha.')
                })

            const token = await this.$recaptcha(process.env.RECAPTCHA_ACTION)
                .catch((e) => {
                    throw new Error('Failed to get recaptcha token.')
                })
            
            this.recaptchaToken = token
            return token
        },
        async getTokenVerify(token) {
            const isVerify = await RecaptchaApi.loadVerifyForSite(token)
                .catch((e) => {
                    throw new Error('Failed to verify recaptcha token.')
                })

            this.isTokenVerify = isVerify
            return isVerify
        }
    },
}