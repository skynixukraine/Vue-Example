<template>
    <modal
        name="register-success"
        transition="nice-modal-fade"
        :width="500"
        :height="'auto'"
        :delay="100"
        :adaptive="true"
        :class="'modal'"
    >
        <button class="modal__close-button" @click="closeModal('register-success')"></button>
        <header class="modal__header">
            <h3 class="modal__title">Register Success</h3>
        </header>
        <div class="modal__main">
            <p>We have sent you a confirmation email to the email address specified during registration.</p>
        </div>
        <footer class="modal__footer">
            <div class="modal__footer-item">
                <button class="link link--button link--button-blue" @click="onResendEmail">Resend email</button>
            </div>
        </footer>
    </modal>
</template>

<script>
// libs
import { load } from 'recaptcha-v3'
// mixins
import modal from '~/mixins/modal'

export default {
    mixins: [
        modal,
    ],

    created() {
        if (process.client) {
            // load and set reCaptcha token for 'send_email_verification_link' action
            load(process.env.RECAPTCHA_SITE_KEY).then((recaptcha) => {
                recaptcha.execute(this.$recaptchaActions.sendEmailVerificationLink).then((token) => {
                    this.recaptchaToken = token
                })
            })
        }
    },

    data() {
        return {
            recaptchaToken: '',
        }
    },

    methods: {
        onResendEmail() {
            const requestData = this.prepareDataForSending({ email: this.$store.getters['user/USER'].email, recaptchaToken: this.recaptchaToken })

            this.$store.dispatch('user/SEND_EMAIL_VERIFICATION_LINK', requestData)
                .then(response => {
                    // дописать завтра с утра
                })
                .catch(error => {

                })
            
            // re request captcha (need update after each form send)
            this.recaptchaInstance.execute(this.$recaptchaActions.sendEmailVerificationLink)
                .then(token => {
                    this.recaptchaToken = token
                })
        },

        prepareDataForSending({ email, recaptchaToken }) {
            let formData = new FormData()

            formData.append('email', email)
            formData.append('recaptcha', recaptchaToken)

            return formData
        },
    }
}
</script>