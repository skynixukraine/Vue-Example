<template>
    <modal
        :name="$modals.registerSuccess"
        transition="nice-modal-fade"
        :width="500"
        :height="'auto'"
        :delay="100"
        :adaptive="true"
        :class="'modal'"
    >
        <button class="modal__close-button" @click="closeModal($modals.registerSuccess)"></button>
        <header class="modal__header">
            <h3 class="modal__title">Register Success</h3>
        </header>
        <template v-if="$store.getters['user/USER'].email_verified_at">
            <div class="modal__main">
                <p>An e-mail already verified.</p>
            </div>
            <footer class="modal__footer">
                <div class="modal__footer-item">
                    <button
                        class="link link--button link--button-blue"
                        @click="onClickBackLink"
                    >Back to Homepage</button>
                </div>
            </footer>
        </template>
        <template v-if="!$store.getters['user/USER'].email_verified_at">
            <div class="modal__main">
                <p>We have sent you a confirmation email to the email address specified during registration.</p>
                <h3>{{ countdown }}</h3>
            </div>
            <footer class="modal__footer">
                <div class="modal__footer-item">
                    <button
                        class="link link--button link--button-blue"
                        :disabled="countdown > 0"
                        @click="onResendEmail"
                    >Resend email</button>
                </div>
            </footer>
        </template>
    </modal>
</template>

<script>
// mixins
import modal from '~/mixins/modal'
import recaptcha from '~/mixins/recaptcha'
import countdown from '~/mixins/countdown'

export default {
    mixins: [
        modal,
        recaptcha,
        countdown,
    ],

    created() {
        if (process.client) {
            this.$recaptchaLoaded()
                .then(() => {
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.sendEmailVerificationLink)
                })

            this.startCountdown(10)
        }
    },

    methods: {
        onResendEmail() {
            const requestData = this.prepareDataForSending({ email: this.$store.getters['user/USER'].email, recaptchaToken: this.recaptchaToken })

            this.$store.dispatch('user/SEND_EMAIL_VERIFICATION_LINK', requestData)
                .then(response => {
                    this.startCountdown(10)
                    this.$root.$emit('showNotify', { type: 'success', text: response.message })
                    // re request captcha (need update after each form send)
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.sendEmailVerificationLink)
                })
                .catch(error => {
                    console.log('ERROR ----> ', error);
                    
                    this.$root.$emit('showNotify', { type: 'error', text: error.message })
                    // re request captcha (need update after each form send)
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.sendEmailVerificationLink)
                    console.log(error)
                })
            this.loadAndSetRecaptchaToken(this.$recaptchaActions.sendEmailVerificationLink)
        },

        prepareDataForSending({ email, recaptchaToken }) {
            let formData = new FormData()

            formData.append('email', email)
            formData.append('recaptcha', recaptchaToken)

            return formData
        },

        onClickBackLink() {
            this.closeModal(this.$modals.registerSuccess)
            this.$router.push({ path: this.$routes.home.path })
        },
    }
}
</script>