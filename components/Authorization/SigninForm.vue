<template>
    <form
        action=""
        class="form"
        method="POST"
        @submit.prevent="onSubmit"
    >
        <div class="form__item">
            <div class="form__title">{{ $t('forms.enter-email') }}</div>
            <input
                class="input"
                type="email"
                name="email"
                ref="email"
                v-model="models.email"
                @keyup="onEmailChange"
            >
            <div class="form__message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.enter-password') }}</div>
            <input
                class="input"
                type="password"
                name="password"
                ref="password"
                v-model="models.password"
                @keyup="onPasswordChange">
            <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form__item">
            <button
                class="link link--button link--button-blue"
                type="submit"
            >{{ $t('links.signin') }}</button>
        </div>
    </form>
</template>

<script>
// mixins
import validator from '~/mixins/validator'

export default {
    mixins: [
        validator,
    ],

    data() {
        return {
            models: {
                email: '',
                password: '',
            },
        }
    },

    methods: {
        onSubmit() {
            if ( !this.validateForm(this.models) ) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Форма не прошла предварительную валидацию.' })
                return false
            }

            const formData = this.prepareDataForSending(this.models)

            this.$store.dispatch('user/LOGIN_USER', formData)
                .then((token) => {
                    this.$store.dispatch('user/LOAD_USER', { id: token.data.doctor_id, token: token.data.access_token })
                })
        },
        
        async validateForm(models) {
            // check required fields
            if (!models.email) {
                this.errors['email'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.password) {
                this.errors['password'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }

            // check recaptcha token exist
            if (!this.recaptchaToken) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Рекаптча ТОКЕН не обнаружен. Невозможно отправить форму.' })
                return false
            }

            return true
        },

        prepareDataForSending(models) {
            let formData = new FormData()

            // required fields
            formData.append('email', models.email)
            formData.append('password', models.password)

            // recaptcha token for action 'login_doctor'
            formData.append('recaptcha', this.recaptchaToken)

            return formData
        },


        // input changes
        onEmailChange(event) {
            this.validateEmail(event)
            this.$forceUpdate()
        },
        onPasswordChange(event) {
            this.validatePassword(event)
            this.$forceUpdate()
        }
    }
}
</script>